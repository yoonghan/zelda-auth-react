import { Navigate } from 'react-router-dom'
import { urls } from '../../routes/const'
import { type ReactNode } from 'react'
import { AuthenticationConsumer } from '../../context/authentication'
import type { Authentication } from '../../types/authentication'
import { isEmpty } from '../../shared/util/StringUtil'

interface Props {
  failRedirectTo: 'Profile' | 'SignIn'
  children: (authenticatedProps: Authentication) => ReactNode
}

interface PageRedirectorProps extends Props, Authentication {}

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
}: PageRedirectorProps): JSX.Element => {
  switch (props.loggedIn) {
    case null:
      return <>Initializing</>
    case true:
      if (failRedirectTo === 'Profile' && !isEmpty(props.displayName)) {
        return <Navigate to={urls.profile} replace={true} />
      }
      break
    case false:
      if (failRedirectTo === 'SignIn') {
        return <Navigate to={urls.signin} replace={true} />
      }
      break
  }

  return <>{children(props)}</>
}

export default ProtectedPage
