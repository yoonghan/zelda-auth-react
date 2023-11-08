import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import { urls } from '../../routes/const'
import Link from '@mui/material/Link'
import { useCallback, useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { useForm } from 'react-hook-form'
import { namePattern } from '../shared/validation'
import type { OnUpdateUser } from '../../types/authentication'

interface FormValues {
  displayName: string | null
}

interface Props {
  displayName: string | null
  onUpdateUser: OnUpdateUser
}

export default function Profiler({
  displayName: defaultDisplayName,
  onUpdateUser,
}: Props) {
  const [processState, setProcessState] = useState({
    isProcessing: false,
    error: undefined,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = useCallback(
    async (form: FormValues) => {
      setProcessState({
        isProcessing: true,
        error: undefined,
      })
      const response = await onUpdateUser({ displayName: form.displayName })
      setProcessState({
        isProcessing: false,
        error: response.error,
      })
    },
    [onUpdateUser]
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
          <li key={error}>{errors[error].message?.toString()}</li>
        ))}
      </ul>
    )
  })()

  return (
    <Container component="main" maxWidth="md">
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
      <Typography component="h1" variant="h5">
        Welcome <strong>{defaultDisplayName}</strong>
      </Typography>
      <Box
        component="form"
        onSubmit={(form) => {
          void handleSubmit(onSubmit)(form)
        }}
        noValidate
        sx={{ mt: 1, width: 1 }}
      >
        <Box
          component="fieldset"
          sx={{ border: 0 }}
          disabled={processState.isProcessing}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="displayName"
            label="Display Name"
            name="displayName"
            defaultValue={defaultDisplayName}
            {...register('displayName', {
              required: 'Display name is required.',
              pattern: {
                value: namePattern,
                message: 'Display name is invalid.',
              },
            })}
          />
          <Grid container>
            <Grid item xs={3} sx={{ marginTop: 2 }}>
              <FormControl
                sx={{ minWidth: 120, maxWidth: 300 }}
                disabled={true}
              >
                <InputLabel shrink htmlFor="phone-code" required={true}>
                  Code
                </InputLabel>
                <Select value={'65'} label="Code" id="phone-code">
                  <MenuItem value={65}>65 - Singapore</MenuItem>
                  <MenuItem value={60}>60 - Malaysia</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={9}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                value="11111111"
                disabled={true}
              />
            </Grid>
          </Grid>

          {inputErrors && <Alert severity="error">{inputErrors}</Alert>}

          {processState.error && (
            <Alert severity="warning">{processState.error}</Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update
          </Button>
        </Box>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={processState.isProcessing}
          data-testid="loader"
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant={'body2'}>
          <Link href={urls.changePassword}>Change Password</Link>
        </Typography>
      </Box>
    </Container>
  )
}
