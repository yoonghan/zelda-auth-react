import { fabClasses } from "@mui/material";
import Confirm from ".";
import { findByText, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("Create", () => {
  const renderComponent = (
    onCreate = jest.fn(),
    errorMessage = undefined,
    loggedIn = false
  ) =>
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <Confirm
                onCreate={onCreate}
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
    expect(getByText("Create User")).toBeInTheDocument();

    expect(getByLabelText("Email Address *")).toBeInTheDocument();
    expect(getByLabelText("Password *")).toBeInTheDocument();
    expect(getByLabelText("Confirm Password *")).toBeInTheDocument();

    expect(getByRole("button", { name: "Create" })).toBeInTheDocument();

    expect(getByText(/^Copyright ©.*2023\.$/)).toBeInTheDocument();

    expect(queryByRole("alert")).not.toBeInTheDocument();
  });

  describe("Validation", () => {
    it("should indicate email and password is not entered if user submit", async () => {
      const onCreateMock = jest.fn();
      const { getByRole, getByText } = renderComponent(onCreateMock);
      await userEvent.click(getByRole("button", { name: "Create" }));
      expect(getByText("Email address is required")).toBeInTheDocument();
      expect(getByText("Password is required")).toBeInTheDocument();
      expect(getByText("Confirm password is required")).toBeInTheDocument();
    });

    it("should enable form enter press", async () => {
      const onCreateMock = jest.fn();
      const { getByLabelText, getByRole, getByText } =
        renderComponent(onCreateMock);
      await userEvent.type(getByLabelText("Email Address *"), "{enter}");
      expect(getByRole("alert")).toBeInTheDocument();
      expect(getByText("Email address is required")).toBeInTheDocument();
    });

    it("should display error is password has not been retype", async () => {
      const onCreateMock = jest.fn();
      const { getByLabelText, findByText } = renderComponent(onCreateMock);
      await userEvent.type(
        getByLabelText("Email Address *"),
        "walcron@gmail.com"
      );
      await userEvent.type(getByLabelText("Password *"), "abcdefg123");
      await userEvent.type(
        getByLabelText("Confirm Password *"),
        "12333{enter}"
      );
      expect(
        await findByText("Your confirmed password doesn't match")
      ).toBeInTheDocument();
    });

    it("should not display error", async () => {
      const onCreateMock = jest.fn();
      const { queryByRole, getByRole, getByLabelText } =
        renderComponent(onCreateMock);
      await userEvent.type(
        getByLabelText("Email Address *"),
        "walcron@gmail.com"
      );
      await userEvent.type(getByLabelText("Password *"), "walcron@gmail.com");
      await userEvent.type(
        getByLabelText("Confirm Password *"),
        "walcron@gmail.com"
      );
      await userEvent.click(getByRole("button", { name: "Create" }));
      expect(queryByRole("alert")).not.toBeInTheDocument();
    });
  });

  describe("login", () => {
    it("should be able to signin with valid authentication and show loading", async () => {
      const onCreateMock = jest.fn();
      const { getByLabelText, getByRole, findByTestId } =
        renderComponent(onCreateMock);
      await userEvent.type(
        getByLabelText("Email Address *"),
        "walcron@email.com"
      );
      await userEvent.type(getByLabelText("Password *"), "testPassword");
      await userEvent.type(
        getByLabelText("Confirm Password *"),
        "testPassword"
      );
      await userEvent.click(getByRole("button", { name: "Create" }));
      expect(onCreateMock).toHaveBeenCalled();
      expect(await findByTestId("loader")).toBeInTheDocument();
    });

    it("should be show exception when sign in failed and loader does not appear", async () => {
      const errorMessage = "Sorry, unable to create";
      const onCreateMock = jest.fn();
      const { getByText } = renderComponent(onCreateMock, errorMessage);
      expect(getByText(errorMessage)).toBeInTheDocument();
    });

    it("should go profile if user is already logged in", () => {
      const onCreateMock = jest.fn();
      renderComponent(onCreateMock, undefined, true);
      expect(screen.getByText("Profile")).toBeInTheDocument();
    });
  });
});