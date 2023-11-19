import TextField from '@mui/material/TextField'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

/**
 * For testing combination of MUI with react hook form
 */

export default function TestField({ value }: { value: number }) {
  const {
    register,
    formState, //mark this for reference that if destructred to {error, isValid} there will be exception thrown.
  } = useForm()

  useEffect(() => {}, [formState.isValid])

  return (
    <TextField
      margin="normal"
      required
      fullWidth
      id={'anumber'}
      label="Phone Number"
      name="phone"
      defaultValue={value}
      {...register('phone', {
        required: 'requiredField',
      })}
    />
  )
}
