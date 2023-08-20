import SignIn from ".";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("SignIn", () => {
  const renderComponent = (
    onSignIn = jest.fn(),
    errorMessage = undefined,
    loggedIn = false
  ) =>
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <SignIn
                onSignIn={onSignIn}
                error={errorMessage}
                loggedIn={loggedIn}
              />
            }
          ></Route>
          <Route path="/auth/profile" element={<div>Profile</div>}></Route>
        </Routes>
      </MemoryRouter>
    );

  it("should render login component correctly", () => {
    renderComponent();
    expect(screen.getByText("Sign in")).toBeInTheDocument();

    expect(screen.getByLabelText("Email Address *")).toBeInTheDocument();
    expect(screen.getByLabelText("Password *")).toBeInTheDocument();

    expect(
      screen.getByRole("checkbox", { name: "Remember me" })
    ).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();

    expect(screen.getByText(/^Copyright ©.*2023\.$/)).toBeInTheDocument();
  });

  it("should be able to signin with valid authentication", async () => {
    const onSignInMock = jest.fn();
    renderComponent(onSignInMock);
    await userEvent.type(
      screen.getByLabelText("Email Address *"),
      "walcron@email.com"
    );
    await userEvent.type(screen.getByLabelText("Password *"), "testPassword");
    await userEvent.click(screen.getByRole("button", { name: "Sign In" }));
    expect(onSignInMock).toHaveBeenCalled();
  });

  it("should be show exceptio when sign in failed", async () => {
    const errorMessage = "Sorry, it's an invalid sign-in";
    const onSignInMock = jest.fn();
    renderComponent(onSignInMock, errorMessage);
    await userEvent.type(
      screen.getByLabelText("Email Address *"),
      "walcron@email.com"
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should go profile if user is already logged in", () => {
    const onSignInMock = jest.fn();
    renderComponent(onSignInMock, undefined, true);
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });
});
