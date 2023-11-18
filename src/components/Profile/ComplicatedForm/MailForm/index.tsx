import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { useFormError } from '../../../../hooks/useFormError'
import { countryCodes } from '../ContactListForm/const'
import { useRef } from 'react'
import { Typography } from '@mui/material'
import DropDown from '../../../Dropdown'
import SaveDialog, { SaveDialogHandler } from '../SaveDialog'

interface FormValues {
  address?: string
  postalCode?: string
  country?: string
}

interface Props extends FormValues {
  onSubmit: (fullAddress: {
    address: string
    postalCode: string
    country: string
  }) => void
}

export default function MailForm({
  address,
  postalCode,
  country = 'MY',
  onSubmit,
}: Props) {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm<FormValues>({ mode: 'onBlur' })
  const { renderedError } = useFormError(errors)

  const dialogRef = useRef<SaveDialogHandler>(null)

  const renderSavedInformation = () => {
    return (
      <div>
        <Typography>Address: </Typography>
        <Typography>{getValues('address')} </Typography>
        <Typography>
          {getValues('postalCode')}{' '}
          {
            countryCodes.find((code) => code.key === getValues('country'))
              ?.label
          }
        </Typography>
      </div>
    )
  }

  const onSubmitForm = ({ address, postalCode, country }: FormValues) => {
    onSubmit({
      address,
      postalCode,
      country,
    })
    dialogRef.current.openSaveDialog()
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmitForm)}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="address"
        label="Address"
        name="address"
        autoComplete="address"
        defaultValue={address}
        {...register('address', {
          required: 'Address is required.',
        })}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        id="postalCode"
        label="Postal Code"
        name="postalCode"
        type="number"
        defaultValue={postalCode}
        autoComplete="postal-code"
        {...register('postalCode', {
          required: 'Postal Code is required.',
        })}
      />

      <Grid sx={{ mt: 2 }}>
        <Grid item>
          <DropDown
            label={'Country'}
            id={'country'}
            register={register}
            items={countryCodes}
            defaultValue={country}
            required={true}
          />
        </Grid>
      </Grid>

      {renderedError}

      <Button
        type="submit"
        color="secondary"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Save Mailing Address
      </Button>
      <SaveDialog
        ref={dialogRef}
        renderSavedInformation={renderSavedInformation}
      />
    </Box>
  )
}
