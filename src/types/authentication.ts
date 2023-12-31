import type {
  ChangePasswordResponse,
  EmailPasswordResetResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateUserAdditionalInfo,
  UpdateUserAdditionalInfoResponse,
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
export type OnUpdateUser = (
  userInfo: UpdateUserRequest
) => Promise<UpdateUserResponse>
export type OnUpdateUserAdditionalInfo = (
  userAdditionalInfo: Partial<UpdateUserAdditionalInfo>
) => Promise<UpdateUserAdditionalInfoResponse>
export type OnGetUserAdditionalInfo = () => Promise<UpdateUserAdditionalInfo>
export type Error = string | undefined
export type LoggedIn = boolean | null
export type DisplayName = string | null

export interface Authentication {
  onSignIn: OnSignIn
  onCreate: OnCreate
  onSignOut: OnSignOut
  onSendEmailToResetPassword: OnSendEmailToReset
  onChangePassword: OnChangePassword
  onUpdateUser: OnUpdateUser
  onUpdateUserAdditionalInfo: OnUpdateUserAdditionalInfo
  onGetUserAdditionalInfo: OnGetUserAdditionalInfo
  error: Error
  loggedIn: LoggedIn
  displayName: DisplayName
  isProcessing: boolean
}
