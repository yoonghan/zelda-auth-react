import {
  AuthenticationConsumer,
  AuthenticationProvider,
  defaultProps,
} from "./authentication";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("authentication", () => {
  it("should have correct authentication defaults", () => {
    expect(defaultProps.error).toBeUndefined();
    defaultProps.onSignIn("user", "password");
    defaultProps.onSignOut();
  });

  describe("provider", () => {
    it("should authenticate properly", async () => {
      render(
        <AuthenticationProvider>
          <AuthenticationConsumer>
            {({ onSignIn, onSignOut, error }) => (
              <>
                <div>
                  <span>Error: {error}</span>
                </div>
                <button onClick={() => onSignIn("username", "password")}>
                  Sign In
                </button>
                <button onClick={onSignOut}>Sign Out</button>
              </>
            )}
          </AuthenticationConsumer>
        </AuthenticationProvider>
      );
      await userEvent.click(screen.getByRole("button", { name: "Sign In" }));
      await userEvent.click(screen.getByRole("button", { name: "Sign Out" }));
    });
  });
});
