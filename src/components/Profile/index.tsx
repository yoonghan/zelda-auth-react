import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { Copyright } from "@yoonghan/walcron-microfrontend-shared";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid";

export default function Profiler() {
  return (
    <Container component="main" maxWidth="md">
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
      <Typography component="h1" variant="h5">
        Logged in
      </Typography>
      <Alert severity="warning">
        You can't change your profile, everything is hardcoded
      </Alert>
      <Box>
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          value="Walcron"
          disabled={true}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          value="Coorperation"
          disabled={true}
        />
        <Grid container>
          <Grid item xs={3} sx={{ marginTop: 2 }}>
            <FormControl sx={{ minWidth: 120, maxWidth: 300 }} disabled={true}>
              <InputLabel shrink htmlFor="phone-code" required={true}>
                Code
              </InputLabel>
              <Select value={"65"} label="Code" id="phone-code">
                <MenuItem value={65}>65 - Singapore</MenuItem>
                <MenuItem value={60}>60 - Malaysia</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={9}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              value="11111111"
              disabled={true}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={true}
        >
          Update
        </Button>
      </Box>
      <Copyright lastUpdatedYear={2023} />
    </Container>
  );
}
