import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { urls } from '../../routes/const'
import { startTransition, useCallback, useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import type { OnUpdateUser } from '../../types/authentication'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import DisplayNameForm from './DisplayNameForm'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import ComplicatedForm from './ComplicatedForm'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'

interface FormValues {
  displayName: string | null
}

interface Props {
  displayName: string | null
  onUpdateUser: OnUpdateUser
}

export default function Profiler({ displayName, onUpdateUser }: Props) {
  const [isModalOpen, setModalOpen] = useState(false)

  const [processState, setProcessState] = useState({
    title: undefined,
    isProcessing: false,
    status: undefined,
    error: undefined,
  })

  const onSubmit = useCallback(
    (title: string) => async (form: FormValues) => {
      setModalOpen(false)
      setProcessState({
        title: title,
        isProcessing: true,
        status: undefined,
        error: undefined,
      })
      const response = await onUpdateUser({
        displayName: form.displayName,
      })

      startTransition(() => {
        setProcessState({
          title: title,
          isProcessing: false,
          status: response.isProfileUpdated ? 'Updated.' : 'Fail To Update.',
          error: response.error,
        })
        setModalOpen(true)
      })
    },
    [onUpdateUser]
  )

  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [])

  return (
    <>
      <Container component="main" maxWidth="md">
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
        <Typography component="h1" variant="h5">
          Welcome <strong>{displayName}</strong>
        </Typography>
        <hr />

        <Box sx={{ p: 1 }}>
          {processState.title && (
            <Alert severity={processState.error ? 'error' : 'success'}>
              Latest update to ({processState.title}): {processState.status}
            </Alert>
          )}
        </Box>
        <Box>
          <Accordion defaultExpanded={true}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="h3" variant="h6">
                Salutations
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <DisplayNameForm
                isProcessing={processState.isProcessing}
                defaultDisplayName={displayName}
                updateUser={onSubmit('Salutations')}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="h3" variant="h6">
                Password Change
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Should you require to change you password, use this link.
              </Typography>
              <Button
                href={urls.changePassword}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Change Password
              </Button>
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography component="h3" variant="h6">
                More Personal Information
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ComplicatedForm />
            </AccordionDetails>
          </Accordion>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={processState.isProcessing}
            data-testid="loader"
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Container>

      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <DialogTitle>Updated {processState.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {processState.title} - {processState.status}
          </DialogContentText>
        </DialogContent>
        {processState.error && (
          <Alert severity="error">{processState.error}</Alert>
        )}
        <DialogActions>
          <Button onClick={closeModal} autoFocus color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
