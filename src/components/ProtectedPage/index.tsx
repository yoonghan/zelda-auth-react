import { Navigate } from 'react-router-dom'
import { urls } from '../../routes/const'
import { type ReactNode } from 'react'

interface Props {
  loggedIn: boolean
  redirectTo: 'Profile' | 'SignIn'
  children: ReactNode
}

const ProtectedPage = ({ loggedIn, redirectTo, children }: Props) => {
  if (loggedIn && redirectTo === 'Profile') {
    return <Navigate to={urls.profile} replace={true} />
  }
  if (!loggedIn && redirectTo === 'SignIn') {
    return <Navigate to={urls.signin} replace={true} />
  }
  return <>{children}</>
}

export default ProtectedPage
