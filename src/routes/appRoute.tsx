import About from "./About";
import Root from "./Root";
import ErrorPage from "./ExtendedErrorPage";
import SignIn from "../components/SignIn";
import SignOut from "../components/SignOut";
import { RouteObject } from "react-router-dom";
import Profiler from "../components/Profile";

type Props = {
  onSignIn: () => void;
  onSignOut: () => void;
};

const routes = (props: Props): RouteObject => ({
  path: "/auth",
  element: <Root />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "",
      element: <About />,
    },
    {
      path: "about",
      element: <About />,
    },
    {
      path: "profile",
      element: <Profiler />,
    },
    {
      path: "login",
      element: <SignIn {...props} />,
    },
    {
      path: "logout",
      element: <SignOut {...props} redirect="/auth/login" />,
    },
  ],
});

export default routes;
