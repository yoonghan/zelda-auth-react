import type {
  ChangePasswordResponse,
  EmailPasswordResetResponse,
} from '@walcron/zelda-shared-context'

export type OnSignIn = (username: string, password: string) => void
export type OnCreate = (
  username: string,
  password: string,
  displayName: string
) => void
export type OnSignOut = () => Promise<void>
export type OnSendEmailToReset = (
  email: string
) => Promise<EmailPasswordResetResponse>
export type OnChangePassword = (
  oldPassword,
  newPassword
) => Promise<ChangePasswordResponse>
export type Error = string | undefined
export type LoggedIn = boolean | null

export interface Authentication {
  onSignIn: OnSignIn
  onCreate: OnCreate
  onSignOut: OnSignOut
  onSendEmailToResetPassword: OnSendEmailToReset
  onChangePassword: OnChangePassword
  error: Error
  loggedIn: LoggedIn
}
