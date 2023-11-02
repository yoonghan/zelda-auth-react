import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Grid from '@mui/material/Grid'
import { urls } from '../../routes/const'
import Link from '@mui/material/Link'

interface Props {
  displayName: string | null
}

export default function Profiler({ displayName }: Props) {
  return (
    <Container component="main" maxWidth="md">
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
      <Typography component="h1" variant="h5">
        Logged in
      </Typography>
      <Alert severity="warning">
        You can&apos;t change your profile, everything is hardcoded
      </Alert>
      <Box>
        <TextField
          margin="normal"
          required
          fullWidth
          id="displayName"
          label="Display Name"
          name="displayName"
          value={displayName}
          disabled={true}
        />
        <Grid container>
          <Grid item xs={3} sx={{ marginTop: 2 }}>
            <FormControl sx={{ minWidth: 120, maxWidth: 300 }} disabled={true}>
              <InputLabel shrink htmlFor="phone-code" required={true}>
                Code
              </InputLabel>
              <Select value={'65'} label="Code" id="phone-code">
                <MenuItem value={65}>65 - Singapore</MenuItem>
                <MenuItem value={60}>60 - Malaysia</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={9}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              value="11111111"
              disabled={true}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={true}
        >
          Update
        </Button>
      </Box>
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant={'body2'}>
          <Link href={urls.changePassword}>Change Password</Link>
        </Typography>
      </Box>
    </Container>
  )
}
