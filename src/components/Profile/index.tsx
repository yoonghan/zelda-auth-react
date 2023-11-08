import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { urls } from '../../routes/const'
import { useCallback, useState } from 'react'
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

interface FormValues {
  displayName: string | null
}

interface Props {
  displayName: string | null
  onUpdateUser: OnUpdateUser
}

export default function Profiler({ displayName, onUpdateUser }: Props) {
  const [processState, setProcessState] = useState({
    isProcessing: false,
    error: undefined,
  })

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

  return (
    <Container component="main" maxWidth="md">
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
      <Typography component="h1" variant="h5">
        Welcome <strong>{displayName}</strong>
      </Typography>
      <hr />
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
              updateUser={onSubmit}
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
            <Alert severity="info">Change your password here</Alert>
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

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={processState.isProcessing}
          data-testid="loader"
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
      <Box>
        {processState.error && (
          <Alert severity="warning">{processState.error}</Alert>
        )}
      </Box>
    </Container>
  )
}
