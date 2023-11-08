import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { namePattern } from '../../shared/validation'
import Alert from '@mui/material/Alert'

interface FormValues {
  displayName: string | null
}

export interface Props {
  defaultDisplayName: string
  isProcessing: boolean
  updateUser: (form: FormValues) => void
}

export default function DisplayNameForm({
  defaultDisplayName,
  isProcessing,
  updateUser,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

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
    <Box
      component="form"
      onSubmit={(form) => {
        handleSubmit((_form) => {
          updateUser(_form)
        })(form)
      }}
      noValidate
    >
      <Box component="fieldset" sx={{ border: 0 }} disabled={isProcessing}>
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

        {inputErrors && <Alert severity="error">{inputErrors}</Alert>}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update Display Name
        </Button>
      </Box>
    </Box>
  )
}
