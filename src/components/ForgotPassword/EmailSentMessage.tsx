import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface Props {
  email: string
}

const EmailSentMessage = ({ email }: Props) => {
  return (
    <Box>
      <Typography>
        Reset email has been sent, check your ({email.toLocaleLowerCase()}).
      </Typography>
      <Button
        type="link"
        fullWidth
        variant="contained"
        sx={{ mt: 2, mb: 2 }}
        href="/auth/login"
      >
        Return To Login
      </Button>
      <Button
        type="link"
        fullWidth
        variant="contained"
        sx={{ mt: 2, mb: 2 }}
        href="/auth/confirm-password"
      >
        Confirm Password
      </Button>
    </Box>
  )
}

export default EmailSentMessage
