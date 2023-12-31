import { type ChangePasswordResponse } from '@walcron/zelda-shared-context'
import { useCallback, useState } from 'react'
import { urls } from '../../routes/const'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { passwordLength } from '../shared/validation'
import Alert from '@mui/material/Alert'
import { useForm } from 'react-hook-form'
import Link from '@mui/material/Link'
import type { OnChangePassword } from '../../types/authentication'
import { useFormError } from '../../hooks/useFormError'

interface FormValues {
  oPassword: string
  nPassword: string
}

interface ProcessingState extends ChangePasswordResponse {
  isProcessing: boolean
}

interface Props {
  onChangePassword: OnChangePassword
}

const ChangePassword = ({ onChangePassword }: Props) => {
  const [processState, setProcessState] = useState<ProcessingState>({
    isProcessing: false,
    error: undefined,
    isChanged: false,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm()

  const onSubmit = useCallback(
    async (formValues: FormValues) => {
      setProcessState({
        ...processState,
        isProcessing: true,
      })
      const response = await onChangePassword(
        formValues.oPassword,
        formValues.nPassword
      )
      if (response.isChanged) {
        setValue('oPassword', '')
        setValue('nPassword', '')
        setValue('rPassword', '')
      }
      setProcessState({
        error: response.error,
        isChanged: response.isChanged,
        isProcessing: false,
      })
    },
    [onChangePassword, processState, setValue]
  )

  const { renderedError } = useFormError(errors)

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>

        {processState.isChanged && (
          <Alert severity="success">Your new has been updated!</Alert>
        )}

        <Box
          component="form"
          onSubmit={(form) => {
            void handleSubmit(onSubmit)(form)
          }}
          noValidate
          sx={{ mt: 1, width: 1 }}
        >
          <Box component="fieldset" sx={{ border: 0 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="oPassword"
              label="Old Password"
              name="oPassword"
              type="password"
              autoFocus
              {...register('oPassword', {
                required: 'Old Password is required',
              })}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="nPassword"
              label="New Password"
              name="nPassword"
              type="password"
              {...register('nPassword', {
                required: 'New Password is required',
                minLength: {
                  value: passwordLength,
                  message: `Password min length is ${passwordLength}`,
                },
              })}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="rPassword"
              label="Retype New Password"
              name="rPassword"
              type="password"
              {...register('rPassword', {
                required: 'Retype new password is required',
                validate: (retypedPassword: string) => {
                  if (watch('nPassword') !== retypedPassword) {
                    return "Your new password doesn't match"
                  }
                },
              })}
            />
          </Box>
          {renderedError}

          {processState.error && (
            <Alert severity="warning">{processState.error}</Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
          >
            Update Password
          </Button>
        </Box>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={processState.isProcessing}
          data-testid="loader"
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Box
          sx={{
            marginBottom: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant={'body2'}>
            <Link href={urls.profile}>Return to Profile</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}

export default ChangePassword
