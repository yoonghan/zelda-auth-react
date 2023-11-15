import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { phoneCountries, phoneLabels } from '../const'
import { phoneLength, phonePattern } from '../../../../shared/validation'
import { useFormError } from '../../../../../hooks/useFormError'
import { Contact } from '../types'
import { generateId } from '../generateId'
import DropDown from '../../../../Dropdown'

interface ContactFormProps extends Contact {
  changeCallback: (
    name: string,
    value: {
      [key: string]: unknown
    }
  ) => void
  changeIsValid: (isValid: boolean) => void
}

export default function ContactForm({
  id,
  phoneFor,
  phoneCode,
  phoneNumber,
  changeCallback,
  changeIsValid,
}: ContactFormProps) {
  const { register, formState, watch } = useForm({ mode: 'onBlur' })

  const { renderedError } = useFormError(formState.errors)

  useEffect(() => {
    const subscription = watch((value, { name }) => changeCallback(name, value))
    return () => subscription.unsubscribe()
  }, [changeCallback, watch])

  useEffect(() => {
    changeIsValid(formState.isValid)
  }, [changeIsValid, formState])

  return (
    <Box>
      <Grid container>
        <Grid item xs={6} md={3} sx={{ marginTop: 2 }}>
          <DropDown
            label={'Phone For'}
            id={generateId(id, 'phoneFor')}
            register={register}
            items={phoneLabels}
            defaultValue={phoneFor}
            required={true}
          />
        </Grid>
        <Grid
          item
          xs={6}
          md={3}
          sx={{ marginTop: 2, paddingLeft: 1, paddingRight: 1 }}
        >
          <DropDown
            label={'Country'}
            id={generateId(id, 'phoneCode')}
            register={register}
            items={phoneCountries}
            defaultValue={phoneCode}
            required={true}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            id={generateId(id, 'phoneNumber')}
            label="Phone Number"
            name="phone"
            defaultValue={phoneNumber}
            {...register(generateId(id, 'phoneNumber'), {
              required: 'Phone number is required.',
              minLength: {
                value: phoneLength.min,
                message: `Phone number is at least ${phoneLength.min} in length.`,
              },
              maxLength: {
                value: phoneLength.max,
                message: `Phone number is at most ${phoneLength.max} in length.`,
              },
              pattern: {
                value: phonePattern,
                message: 'Phone number is invalid, allowed only (0-9).',
              },
            })}
          />
        </Grid>
      </Grid>

      {renderedError}
    </Box>
  )
}
