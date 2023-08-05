/* istanbul ignore file -- @preserve */
/** Ignore styling for test case **/
import * as React from "react";
import createTheme from "@mui/material/styles/createTheme";
import { green, purple } from "@mui/material/colors";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { LinkProps } from "@mui/material/Link";

// eslint-disable-next-line react-refresh/only-export-components
const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

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
