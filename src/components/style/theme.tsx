/* istanbul ignore file -- @preserve */
/** Ignore styling for test case **/
import * as React from "react";
import { createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";
import { LinkProps } from "@mui/material/Link";
import { LinkBehavior } from "../LinkBehavior";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});

const defaultTheme = createTheme(theme);

export default defaultTheme;
