import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SignOut = ({
  onSignOut,
  redirect,
}: {
  onSignOut: () => Promise<void>
  redirect: string
}) => {
  const navigate = useNavigate()

  const logout = useCallback(async () => {
    await onSignOut()
    if (!redirect.includes('logout')) {
      navigate(redirect)
    }
  }, [navigate, onSignOut, redirect])

  useEffect(() => {
    void logout()
  }, [logout])

  return <>Signing out</>
}

export default SignOut
