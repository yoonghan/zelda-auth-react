import { Navigate } from 'react-router-dom'
import { urls } from '../../routes/const'
import { type ReactNode } from 'react'
import {
  AuthenticationConsumer,
  type Props as AuthenticatedContextProps,
} from '../../context/authentication'

interface Props {
  failRedirectTo: 'Profile' | 'SignIn'
  children: (authenticatedProps: AuthenticatedContextProps) => ReactNode
}

interface PageRedirectorProps extends Props, AuthenticatedContextProps {}

const ProtectedPage = ({ children, failRedirectTo }: Props) => {
  return (
    <AuthenticationConsumer>
      {(props) => (
        <PageRedirector failRedirectTo={failRedirectTo} {...props}>
          {(props) => children(props)}
        </PageRedirector>
      )}
    </AuthenticationConsumer>
  )
}

const PageRedirector = ({
  failRedirectTo,
  children,
  ...props
}: PageRedirectorProps) => {
  switch (props.loggedIn) {
    case null:
      return <>Initializing</>
    case true:
      if (failRedirectTo === 'Profile') {
        return <Navigate to={urls.profile} replace={true} />
      }
      break
    case false:
      if (failRedirectTo === 'SignIn') {
        return <Navigate to={urls.signin} replace={true} />
      }
      break
  }

  return children(props)
}

export default ProtectedPage
