import { type ReactNode, createContext, useEffect, useState } from 'react'
import {
  auth$,
  create,
  login,
  logout,
  resetEmail,
  changePassword,
  updateUser,
} from '@walcron/zelda-shared-context'
import { remapAuthenticationError } from './remapError'
import type { Authentication as Props } from '../types/authentication'

export const defaultProps: Props = {
  onCreate: (username: string, password: string, displayName: string) => {
    // empty
  },
  onSignIn: (username: string, password: string) => {
    // empty
  },
  onSignOut: async () => {
    // empty
  },
  onSendEmailToResetPassword: async (email: string) => ({
    isSent: false,
    error: undefined,
  }),
  onChangePassword: async (oldPassword: string, newPassword: string) => ({
    isChanged: false,
    error: undefined,
  }),
  onUpdateUser: async (userRequest) => ({
    isProfileUpdated: false,
    error: undefined,
  }),
  error: undefined,
  loggedIn: false,
  displayName: null,
  isProcessing: false,
}

const AuthenticationContext = createContext(defaultProps)

export const AuthenticationConsumer = AuthenticationContext.Consumer

export const AuthenticationProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [error, setError] = useState('')
  const [loggedIn, setLoggedIn] = useState(null)
  const [displayName, setDisplayName] = useState(null)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    const sub = auth$.subscribe(
      ({ error, sessionToken, displayName, pending }) => {
        setError(remapAuthenticationError(error))
        setLoggedIn(sessionToken !== null)
        setDisplayName(displayName)
        setPending(pending)
      }
    )
    return () => {
      setPending(false)
      sub.unsubscribe()
    }
  }, [])

  return (
    <AuthenticationContext.Provider
      value={{
        onCreate: (username: string, password: string, displayName: string) => {
          void create(username, password, displayName)
        },
        onSignIn: (username: string, password: string) => {
          void login(username, password)
        },
        onSignOut: logout,
        onSendEmailToResetPassword: async (email: string) => {
          const response = await resetEmail(
            email,
            'https://zelda.walcron.com/auth/resetpassword'
          )
          return {
            ...response,
            error: remapAuthenticationError(response?.error),
          }
        },
        onChangePassword: async (oldPassword: string, newPassword: string) => {
          const response = await changePassword(oldPassword, newPassword)
          return {
            ...response,
            error: remapAuthenticationError(response?.error),
          }
        },
        onUpdateUser: async (userRequest) => {
          const response = await updateUser(userRequest)
          return {
            ...response,
            error: remapAuthenticationError(response?.error),
          }
        },
        error,
        loggedIn,
        displayName,
        isProcessing: pending,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
