import {
  AuthenticationConsumer,
  AuthenticationProvider,
  defaultProps,
} from "./authentication";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { login, logout, create } from "@walcron/zelda-shared-context";

describe("authentication", () => {
  it("should have correct authentication defaults", () => {
    expect(defaultProps.error).toBeUndefined();
    expect(defaultProps.loggedIn).toBeFalsy();
    defaultProps.onSignIn("user", "password");
    defaultProps.onCreate("user", "password");
    defaultProps.onSignOut();
  });

  describe("provider", () => {
    it("should authenticate properly", async () => {
      const { getByTestId } = render(
        <AuthenticationProvider>
          <AuthenticationConsumer>
            {({ onCreate, onSignIn, onSignOut, error, loggedIn }) => (
              <>
                <button onClick={() => onCreate("username", "password")}>
                  Create
                </button>
                <button onClick={() => onSignIn("username", "password")}>
                  Sign In
                </button>
                <button onClick={onSignOut}>Sign Out</button>
                <div data-testid={"error"}>{error}</div>
              </>
            )}
          </AuthenticationConsumer>
        </AuthenticationProvider>
      );
      await userEvent.click(screen.getByRole("button", { name: "Create" }));
      expect(create).toHaveBeenCalled();
      await userEvent.click(screen.getByRole("button", { name: "Sign In" }));
      expect(login).toHaveBeenCalled();
      await userEvent.click(screen.getByRole("button", { name: "Sign Out" }));
      expect(logout).toHaveBeenCalled();
      expect(getByTestId("error")).toHaveTextContent("Issue - login");
    });
  });
});
