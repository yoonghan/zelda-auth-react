import { Outlet } from "react-router-dom";
import defaultTheme from "../components/style/theme";
import { ThemeProvider } from "@mui/material";

export default function Root() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Outlet />
    </ThemeProvider>
  );
}
