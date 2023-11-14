import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Alert from '@mui/material/Alert'
import ContactListForm from './ContactListForm'
import MailForm from './MailForm'
import Button from '@mui/material/Button'

export default function ComplicatedForm() {
  const insertData = () => {
    
  }

  return (
    <Box sx={{ mt: 1 }}>
      <Alert severity="warning">
        No information are actually saved or implemented. The reason that the
        form is here is to create a complex form to prove{' '}
        <strong>performance</strong> and{' '}
        <strong>uncompiled form stability</strong>.
      </Alert>

      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="h3" variant="h6">
            Contactless Contact
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ContactListForm />
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="h3" variant="h6">
            Mailing / Billing
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MailForm />
        </AccordionDetails>
      </Accordion>

      <Button onClick={insertData}>Simulate data population</Button>
    </Box>
  )
}
