import { fabClasses } from "@mui/material";
import SignIn from ".";
import {
  findByText,
  getByTestId,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
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
    const { getByRole, getByText, getByLabelText, queryByRole } =
      renderComponent();
    expect(getByText("Sign in")).toBeInTheDocument();

    expect(getByLabelText("Email Address *")).toBeInTheDocument();
    expect(getByLabelText("Password *")).toBeInTheDocument();

    expect(getByRole("link", { name: "Sign me up" })).toHaveAttribute(
      "href",
      "/auth/create"
    );

    expect(getByRole("button", { name: "Sign In" })).toBeInTheDocument();

    expect(getByText(/^Copyright ©.*2023\.$/)).toBeInTheDocument();

    expect(queryByRole("alert")).not.toBeInTheDocument();
  });

  describe("Validation", () => {
    it("should indicate email and password is not entered if user submit", async () => {
      const onSignInMock = jest.fn();
      const { getByRole, getByText } = renderComponent(onSignInMock);
      await userEvent.click(getByRole("button", { name: "Sign In" }));
      expect(getByText("Email address is required")).toBeInTheDocument();
      expect(getByText("Password is required")).toBeInTheDocument();
    });

    it("should enable form enter press", async () => {
      const onSignInMock = jest.fn();
      const { getByLabelText, getByRole, getByText } =
        renderComponent(onSignInMock);
      await userEvent.type(getByLabelText("Email Address *"), "{enter}");
      expect(getByRole("alert")).toBeInTheDocument();
      expect(getByText("Email address is required")).toBeInTheDocument();
    });

    it("should display error for invalid input", async () => {
      const onCreateMock = jest.fn();
      const { getByLabelText, findByText, getByText } =
        renderComponent(onCreateMock);
      await userEvent.type(getByLabelText("Email Address *"), "walcrontest");
      await userEvent.type(getByLabelText("Password *"), "abc{enter}");
      expect(await findByText("Email address is invalid")).toBeInTheDocument();
      expect(await getByText("Password min length is 6")).toBeInTheDocument();
    });
  });

  describe("login", () => {
    it("should be able to signin with valid authentication and show loading", async () => {
      const onSignInMock = jest.fn();
      const { getByLabelText, getByRole, getByTestId } =
        renderComponent(onSignInMock);
      await userEvent.type(
        getByLabelText("Email Address *"),
        "walcron@email.com"
      );
      await userEvent.type(getByLabelText("Password *"), "testPassword");
      await userEvent.click(getByRole("button", { name: "Sign In" }));
      expect(onSignInMock).toHaveBeenCalled();
      expect(getByTestId("loader")).toBeVisible();
    });

    it("should be show exception when sign in failed and loader does not appear", async () => {
      const errorMessage = "Sorry, it's an invalid sign-in";
      const onSignInMock = jest.fn();
      const { getByText, queryByTestId } = renderComponent(
        onSignInMock,
        errorMessage
      );
      expect(getByText(errorMessage)).toBeInTheDocument();
      expect(queryByTestId("loader")).not.toBeVisible();
    });

    it("should go profile if user is already logged in", () => {
      const onSignInMock = jest.fn();
      renderComponent(onSignInMock, undefined, true);
      expect(screen.getByText("Profile")).toBeInTheDocument();
    });
  });
});
