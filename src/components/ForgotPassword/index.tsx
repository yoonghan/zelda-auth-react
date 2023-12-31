import { useMemo, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import EmailSentMessage from './EmailSentMessage'
import { ForgotPasswordForm } from './ForgotPasswordForm'
import Link from '@mui/material/Link'
import { urls } from '../../routes/const'
import type { OnSendEmailToReset } from '../../types/authentication'

export default function ForgotPassword({
  onSendEmailToResetPassword,
}: {
  onSendEmailToResetPassword: OnSendEmailToReset
}) {
  const [emailSentTo, setEmailSentTo] = useState<string | undefined>()

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
        <Typography component="h1" variant="h5">
          Reset a forgotten password
        </Typography>
        {renderedDisplay}

        <Box
          sx={{
            marginBottom: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant={'body2'} component={'p'}>
            Recalled your password?: <Link href={urls.signin}>Sign In</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
