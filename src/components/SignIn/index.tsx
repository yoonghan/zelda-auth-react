import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
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

  const onSubmit = (formValues: FormValues) => {
    onSignIn(formValues.email, formValues.password);
  };

  const printErrors = (errors: FieldErrors<FieldValue<String>>) => {
    const keys = Object.keys(errors);

    return (
      <ul>
        {keys.map((error) => (
          <li key={error}>{`${errors[error].message}`}</li>
        ))}
      </ul>
    );
  };

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
          {errors && Object.keys(errors).length !== 0 && (
            <Alert severity="error">{printErrors(errors)}</Alert>
          )}
          {error && <Alert severity="error">{error}</Alert>}
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
      <Copyright lastUpdatedYear={2023} />
    </Container>
  );
}
