import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

describe("ForgotPassword", () => {
  const renderComponent = (
    onSendEmailToResetPassword = jest.fn(),
    emailSentTriggerCallback = jest.fn()
  ) =>
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <ForgotPasswordForm
                onSendEmailToResetPassword={onSendEmailToResetPassword}
                emailSentTriggerCallback={emailSentTriggerCallback}
              />
            }
          />
          <Route path="/auth/profile" element={<div>Profile</div>}></Route>
        </Routes>
      </MemoryRouter>
    );

  it("should render login component correctly", () => {
    const { getByRole, getByText, getByLabelText, queryByRole } =
      renderComponent();

    expect(getByLabelText("Email Address *")).toBeInTheDocument();

    expect(
      getByRole("button", { name: "Reset My Password" })
    ).toBeInTheDocument();
  });

  describe("Validation", () => {
    it("should indicate email and password is not entered if user submit", async () => {
      const onResetMock = jest.fn();
      const { getByRole, getByText } = renderComponent(onResetMock);
      await userEvent.click(getByRole("button", { name: "Reset My Password" }));
      expect(getByText("Email address is required")).toBeInTheDocument();
    });

    it("should enable form enter press", async () => {
      const onResetMock = jest.fn();
      const { getByLabelText, getByText } = renderComponent(onResetMock);
      await userEvent.type(getByLabelText("Email Address *"), "{enter}");
      expect(getByText("Email address is required")).toBeInTheDocument();
    });

    it("should display error for invalid input", async () => {
      const onResetMock = jest.fn();
      const { getByLabelText, findByText } = renderComponent(onResetMock);
      await userEvent.type(getByLabelText("Email Address *"), "walcron{enter}");
      expect(await findByText("Email address is invalid")).toBeInTheDocument();
    });
  });

  describe("reset sent", () => {
    it("should be able to signin with valid email and show loading", async () => {
      const onResetMock = jest.fn();
      onResetMock.mockImplementation(() => new Promise(() => {}));
      const { getByLabelText, getByRole, findByTestId } =
        renderComponent(onResetMock);
      await userEvent.type(
        getByLabelText("Email Address *"),
        "walcron@email.com"
      );
      await userEvent.click(getByRole("button", { name: "Reset My Password" }));
      expect(onResetMock).toHaveBeenCalled();
      expect(await findByTestId("loader")).toBeVisible();
    });

    it("should be show exception when sign in failed and loader does not appear", async () => {
      const errorMessage = "Sorry, unable to create";
      const onResetMock = jest.fn();
      onResetMock.mockResolvedValue({
        error: errorMessage,
      });
      const { getByText, getByLabelText, getByTestId } =
        renderComponent(onResetMock);
      await userEvent.type(
        getByLabelText("Email Address *"),
        "walcron@email.com{enter}"
      );
      expect(getByText(errorMessage)).toBeInTheDocument();
      expect(getByTestId("loader")).not.toBeVisible();
    });

    it("should be signal email sent when email is sent", async () => {
      const onResetMock = jest.fn();
      const onEmailSentCallbackMock = jest.fn();
      onResetMock.mockResolvedValue({
        isSent: true,
        error: undefined,
      });
      const { getByLabelText, getByTestId } = renderComponent(
        onResetMock,
        onEmailSentCallbackMock
      );
      await userEvent.type(
        getByLabelText("Email Address *"),
        "walcron@email.com{enter}"
      );
      expect(onEmailSentCallbackMock).toHaveBeenCalledWith("walcron@email.com");
      expect(getByTestId("loader")).not.toBeVisible();
    });

    // it("should go profile if user is already logged in", () => {
    //   const onResetMock = jest.fn();
    //   const { getByText } = renderComponent(onResetMock, undefined, true);
    //   expect(getByText("Profile")).toBeInTheDocument();
    // });
  });
});
