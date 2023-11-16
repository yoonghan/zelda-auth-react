import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import { useForm } from 'react-hook-form'
import { useFormError } from '../../../../hooks/useFormError'
import { countryCodes } from '../ContactListForm/const'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import { useCallback, useState } from 'react'
import { Typography } from '@mui/material'
import DropDown from '../../../Dropdown'

interface Props {
  address?: string
  postalCode?: string
  country?: string
}

export default function MailForm({
  address,
  postalCode,
  country = 'MY',
}: Props) {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm({ mode: 'onBlur' })
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)

  const { renderedError } = useFormError(errors)

  const closeSaveDialog = useCallback(() => {
    setSaveDialogOpen(false)
  }, [])

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

  const onSubmitForm = () => {
    setSaveDialogOpen(true)
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
      <Dialog
        open={saveDialogOpen}
        onClose={closeSaveDialog}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <DialogTitle id="modal-title">Saving information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This information are not <strong>&quot;saved&quot;</strong>. It is
            only for programming demo purposes.
          </DialogContentText>
          {renderSavedInformation()}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSaveDialog} autoFocus color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
