import { useCallback, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { useForm } from 'react-hook-form'
import { emailPattern } from '../shared/validation'
import { type EmailPasswordResetResponse } from '@walcron/zelda-shared-context'

interface FormValues {
  email: string
}

interface ProcessingState {
  isProcessing: boolean
  error?: string
  isResetSent: boolean
}

interface Props {
  onSendEmailToResetPassword: (
    email: string
  ) => Promise<EmailPasswordResetResponse>
  emailSentTriggerCallback: (email: string) => void
}

export const ForgotPasswordForm = ({
  onSendEmailToResetPassword,
  emailSentTriggerCallback,
}: Props) => {
  const [processState, setProcessState] = useState<ProcessingState>({
    isProcessing: false,
    error: undefined,
    isResetSent: false,
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const submissionInProgress = useCallback(
    () => processState.isProcessing,
    [processState]
  )

  const onSubmit = useCallback(
    async (formValues: FormValues) => {
      setProcessState({
        isResetSent: false,
        isProcessing: true,
        error: null,
      })

      const response = await onSendEmailToResetPassword(formValues.email)
      if (response.error) {
        setProcessState({
          isResetSent: false,
          isProcessing: false,
          error: response.error,
        })
        return
      }
      if (response.isSent) {
        emailSentTriggerCallback(formValues.email)
      }
      setProcessState({
        isResetSent: false,
        isProcessing: false,
        error: undefined,
      })
    },
    [emailSentTriggerCallback, onSendEmailToResetPassword]
  )

  const inputErrors = (() => {
    const keys = Object.keys(errors)

    if (keys.length === 0) {
      return undefined
    }

    return (
      <ul>
        {keys.map((error) => (
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          <li key={error}>{`${errors[error].message?.toString()}`}</li>
        ))}
      </ul>
    )
  })()

  return (
    <>
      <Box
        component="form"
        onSubmit={(form) => {
          void handleSubmit(onSubmit)(form)
        }}
        noValidate
        sx={{ mt: 1, width: '1' }}
      >
        <Box
          component="fieldset"
          sx={{ border: 0 }}
          disabled={submissionInProgress()}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...register('email', {
              required: 'Email address is required',
              pattern: {
                value: emailPattern,
                message: 'Email address is invalid',
              },
            })}
          />
        </Box>
        {inputErrors && <Alert severity="error">{inputErrors}</Alert>}
        {processState.error && (
          <Alert severity="warning">{processState.error}</Alert>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2, mb: 2 }}
        >
          Reset My Password
        </Button>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={processState.isProcessing}
        data-testid="loader"
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}
