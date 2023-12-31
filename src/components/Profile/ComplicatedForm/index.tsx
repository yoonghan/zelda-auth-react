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
import { useCallback, useEffect, useState } from 'react'
import {
  OnUpdateUserAdditionalInfo,
  OnGetUserAdditionalInfo,
} from '../../../types/authentication'
import type { UpdateUserAdditionalInfo } from '@walcron/zelda-shared-context'

interface Props {
  onUpdateUserAdditionalInfo: OnUpdateUserAdditionalInfo
  onGetUserAdditionalInfo: OnGetUserAdditionalInfo
}

export default function ComplicatedForm({
  onUpdateUserAdditionalInfo,
  onGetUserAdditionalInfo,
}: Props) {
  const [contacts, setContacts] = useState([])
  const [address, setAddress] = useState({})
  const [refreshKey, setRefreshKey] = useState(0)

  const simulateContact = useCallback(() => {
    setRefreshKey(new Date().getTime())
    setContacts([
      {
        id: 'gen-1',
        phoneFor: 'office',
        phoneCode: '60',
        phoneNumber: 90873403,
      },
      {
        id: 'gen-2',
        phoneFor: 'personal',
        phoneCode: '65',
        phoneNumber: 1234567,
      },
      {
        id: 'gen-3',
        phoneFor: 'home',
        phoneCode: '60',
        phoneNumber: 80239231,
      },
    ])
    setAddress({
      address: '327, Golden Brick Road',
      postalCode: '333888',
      country: 'SG',
    })
  }, [])

  const onSubmit =
    (type: keyof UpdateUserAdditionalInfo) => async (information: object) => {
      onUpdateUserAdditionalInfo({
        [type]: information,
      })
    }

  const getUserInformation = useCallback(async () => {
    const userinfo = await onGetUserAdditionalInfo()
    setContacts(userinfo?.contacts || [])
    setAddress(userinfo?.mailingAddress || {})

    setRefreshKey(new Date().getTime())
  }, [onGetUserAdditionalInfo])

  useEffect(() => {
    getUserInformation()
  }, [getUserInformation])

  if (refreshKey === 0) {
    return (
      <div data-testid="complicatedform-loader">
        You won&apos;t see this as it loads very fast.
      </div>
    )
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
          <ContactListForm
            listOfContacts={contacts}
            key={refreshKey}
            onSubmit={onSubmit('contacts')}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="h3" variant="h6">
            Mailing / Billing
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MailForm
            {...address}
            key={refreshKey}
            onSubmit={onSubmit('mailingAddress')}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography component="h3" variant="h6">
            Simulation
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button fullWidth variant="contained" onClick={simulateContact}>
            Simulate Inputs
          </Button>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}
