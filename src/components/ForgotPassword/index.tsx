import { useEffect, useMemo, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { useNavigate } from 'react-router-dom'
import { type EmailPasswordResetResponse } from '@walcron/zelda-shared-context'
import EmailSentMessage from './EmailSentMessage'
import { ForgotPasswordForm } from './ForgotPasswordForm'

export default function ForgotPassword({
  onSendEmailToResetPassword,
  loggedIn,
}: {
  onSendEmailToResetPassword: (
    email: string
  ) => Promise<EmailPasswordResetResponse>
  loggedIn: boolean
}) {
  const navigate = useNavigate()
  const [emailSentTo, setEmailSentTo] = useState<string | undefined>()

  useEffect(() => {
    if (loggedIn) {
      navigate('/auth/profile', { replace: true })
    }
  }, [])

  const renderedDisplay = useMemo(() => {
    if (emailSentTo) {
      return <EmailSentMessage email={emailSentTo} />
    } else {
      return (
        <ForgotPasswordForm
          onSendEmailToResetPassword={onSendEmailToResetPassword}
          emailSentTriggerCallback={setEmailSentTo}
        />
      )
    }
  }, [emailSentTo, onSendEmailToResetPassword])

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
        <Typography component="h1" variant="h4">
          Reset a forgotten password
        </Typography>
        {renderedDisplay}
      </Box>
    </Container>
  )
}
