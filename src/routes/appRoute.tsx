import About from "./About";
import Root from "./Root";
import ErrorPage from "./ExtendedErrorPage";
import SignIn from "../components/SignIn";
import SignOut from "../components/SignOut";
import Profiler from "../components/Profile";
import { AuthenticationConsumer } from "../context/authentication";

const routes = [
  { path: "/", element: <About />, errorElement: <ErrorPage /> },
  {
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
        element: (
          <AuthenticationConsumer>
            {(props) => <SignIn {...props} />}
          </AuthenticationConsumer>
        ),
      },
      /* istanbul ignore next -- @preserve */
      {
        path: "logout",
        element: (
          <AuthenticationConsumer>
            {
              /* istanbul ignore next -- @preserve */
              (props) => <SignOut {...props} redirect="/auth/login" />
            }
          </AuthenticationConsumer>
        ),
      },
    ],
  },
];

export default routes;
