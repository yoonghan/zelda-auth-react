import { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm } from "react-hook-form";
import { emailPattern } from "../shared/validation";
import { type EmailPasswordResetResponse } from "@walcron/zelda-shared-context";

type FormValues = {
  email: string;
};

type ProcessingState = {
  isProcessing: boolean;
  error?: string;
  isResetSent: boolean;
};

type Props = {
  onSendEmailToResetPassword: (
    email: string
  ) => Promise<EmailPasswordResetResponse>;
  emailSentTriggerCallback: (email: string) => void;
};

export const ForgotPasswordForm = ({
  onSendEmailToResetPassword,
  emailSentTriggerCallback,
}: Props) => {
  const [processState, setProcessState] = useState<ProcessingState>({
    isProcessing: false,
    error: undefined,
    isResetSent: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submissionInProgress = useCallback(
    () => processState.isProcessing,
    [processState]
  );

  const sendForRequest = async (email: string) => {
    const response = await onSendEmailToResetPassword(email);
    if (response.error) {
      setProcessState({
        isResetSent: false,
        isProcessing: false,
        error: response.error,
      });
      return;
    } else if (response.isSent) {
      emailSentTriggerCallback(email);
    }
    setProcessState({
      isResetSent: false,
      isProcessing: false,
      error: undefined,
    });
  };

  const onSubmit = useCallback(
    (formValues: FormValues) => {
      setProcessState({
        isResetSent: false,
        isProcessing: true,
        error: null,
      });
      sendForRequest(formValues.email);
    },
    [onSendEmailToResetPassword]
  );

  const inputErrors = (() => {
    const keys = Object.keys(errors);

    if (keys.length === 0) {
      return undefined;
    }

    return (
      <ul>
        {keys.map((error) => (
          <li key={error}>{`${errors[error].message}`}</li>
        ))}
      </ul>
    );
  })();

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{ mt: 1 }}
      >
        <Box
          component="fieldset"
          sx={{ border: 0 }}
          disabled={submissionInProgress()}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...register("email", {
              required: "Email address is required",
              pattern: {
                value: emailPattern,
                message: "Email address is invalid",
              },
            })}
          />
          {inputErrors && <Alert severity="error">{inputErrors}</Alert>}
          {processState.error && (
            <Alert severity="warning">{processState.error}</Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Reset My Password
          </Button>
        </Box>
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={processState.isProcessing}
        data-testid="loader"
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};
