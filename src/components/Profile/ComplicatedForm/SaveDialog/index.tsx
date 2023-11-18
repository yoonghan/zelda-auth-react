import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'

interface Props {
  renderSavedInformation: () => React.ReactNode
  defaultOpen?: boolean
}

export interface SaveDialogHandler {
  openSaveDialog: () => void
}

const SaveDialog = forwardRef<SaveDialogHandler, Props>(function SaveDialog(
  { renderSavedInformation, defaultOpen },
  ref
) {
  const [openDialog, setOpenDialog] = useState(defaultOpen || false)

  const closeSaveDialog = useCallback(() => {
    setOpenDialog(false)
  }, [])

  useImperativeHandle(ref, () => ({
    openSaveDialog() {
      setOpenDialog(true)
    },
  }))

  return (
    <Dialog
      open={openDialog}
      onClose={closeSaveDialog}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <DialogTitle id="modal-title">Information Saved</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This information is <strong>&quot;only saved&quot;</strong> into local
          browser.
        </DialogContentText>
        {renderSavedInformation()}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeSaveDialog} autoFocus color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
})

export default SaveDialog
