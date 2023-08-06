import SignIn from ".";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("SignIn", () => {
  it("should render login component correctly", () => {
    render(
      <SignIn
        onSignIn={() => {
          //empty
        }}
      />
    );
    expect(screen.getByText("Sign in")).toBeInTheDocument();

    expect(screen.getByLabelText("Email Address *")).toBeInTheDocument();
    expect(screen.getByLabelText("Password *")).toBeInTheDocument();

    expect(
      screen.getByRole("checkbox", { name: "Remember me" })
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();

    expect(screen.getByText(/^Copyright ©.*2023\.$/)).toBeInTheDocument();
  });

  it("should be able to click on submit with invalid authentication", async () => {
    const onSignInMock = jest.fn();
    render(<SignIn onSignIn={onSignInMock} />);
    await userEvent.click(screen.getByRole("button", { name: "Sign In" }));
    expect(
      screen.getByText("Try walcron@email.com/testPassword")
    ).toBeInTheDocument();
    expect(onSignInMock).not.toHaveBeenCalled();
  });

  it("should be able to signin with valid authentication", async () => {
    const onSignInMock = jest.fn();
    render(<SignIn onSignIn={onSignInMock} />);
    await userEvent.type(
      screen.getByLabelText("Email Address *"),
      "walcron@email.com"
    );
    await userEvent.type(screen.getByLabelText("Password *"), "testPassword");
    await userEvent.click(screen.getByRole("button", { name: "Sign In" }));
    expect(onSignInMock).toHaveBeenCalled();
  });
});
