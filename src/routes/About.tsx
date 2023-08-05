import { Container, Typography, Grid } from "@mui/material";
import packageJson from "../../package.json";

const About = () => {
  return (
    <Container component="main" maxWidth="xs">
      <Grid container justifyContent="center">
        <Typography component="h1" variant="h1">
          About
        </Typography>
        <Typography component="p">
          This site is used for user up-keep and authentication.
        </Typography>

        <Typography align="center">
          Version <span>{packageJson.version}</span>
        </Typography>
      </Grid>
    </Container>
  );
};

export default About;
