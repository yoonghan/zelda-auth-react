import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { namePattern } from '../../shared/validation'
import { useFormError } from '../../../hooks/useFormError'

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

  const { renderedError } = useFormError(errors)

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

        {renderedError}

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
