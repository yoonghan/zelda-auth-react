import About from './About'
import Root from './Root'
import ErrorPage from './ExtendedErrorPage'
import SignIn from '../components/SignIn'
import SignOut from '../components/SignOut'
import Profiler from '../components/Profile'
import Create from '../components/Create'
import ForgotPassword from '../components/ForgotPassword'
import ChangePassword from '../components/ChangePassword'
import ProtectedPage from '../components/ProtectedPage'

const routes = [
  { path: '/', element: <About />, errorElement: <ErrorPage /> },
  {
    path: '/auth',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <About />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'profile',
        element: (
          <ProtectedPage failRedirectTo="SignIn">
            {({ displayName }) => <Profiler displayName={displayName} />}
          </ProtectedPage>
        ),
      },
      {
        path: 'login',
        element: (
          <ProtectedPage failRedirectTo="Profile">
            {(props) => <SignIn {...props} />}
          </ProtectedPage>
        ),
      },
      {
        path: 'create',
        element: (
          <ProtectedPage failRedirectTo="Profile">
            {(props) => <Create {...props} />}
          </ProtectedPage>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <ProtectedPage failRedirectTo="Profile">
            {(props) => <ForgotPassword {...props} />}
          </ProtectedPage>
        ),
      },
      {
        path: 'change-password',
        element: (
          <ProtectedPage failRedirectTo="SignIn">
            {(props) => <ChangePassword {...props} />}
          </ProtectedPage>
        ),
      },
      {
        path: 'logout',
        element: (
          <ProtectedPage failRedirectTo="SignIn">
            {(props) => <SignOut {...props} />}
          </ProtectedPage>
        ),
      },
    ],
  },
]

export default routes
