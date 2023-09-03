import { useCallback, useEffect, useMemo, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Copyright } from "@yoonghan/walcron-microfrontend-shared";
import { useNavigate } from "react-router-dom";
import { FieldErrors, FieldValue, useForm } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
};

export default function SignIn({
  onSignIn,
  error,
  loggedIn,
}: {
  onSignIn: (username: string, password: string) => void;
  error: string | undefined;
  loggedIn: boolean;
}) {
  const navigate = useNavigate();
  const submissionCount = useRef(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (loggedIn) {
      navigate("/auth/profile", { replace: true });
    }
  }, [loggedIn, navigate]);

  const submissionInProgress = useCallback(
    () => submissionCount.current > 0 && error === undefined,
    [error]
  );

  const onSubmit = useCallback(
    (formValues: FormValues) => {
      onSignIn(formValues.email, formValues.password);
      submissionCount.current += 1;
    },
    [onSignIn]
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
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
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
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                  message: "Email address is invalid",
                },
              })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", {
                required: "Password is required",
                min: 8,
              })}
            />
            <FormControlLabel
              control={
                <Checkbox value="remember" color="primary" id="remember-me" />
              }
              label="Remember me"
            />
            {inputErrors && <Alert severity="error">{inputErrors}</Alert>}
            {error && <Alert severity="warning">{error}</Alert>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={submissionInProgress()}
          data-testid="loader"
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
      <Copyright lastUpdatedYear={2023} />
    </Container>
  );
}
