import Box from '@mui/material/Box'
import Listing from '../../../Listing'
import { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { phoneCountries, phoneLabels } from './const'
import Button from '@mui/material/Button'
import { Contact } from './types'
import { generateId } from './generateId'
import ContactForm from './ContactForm'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Alert from '@mui/material/Alert'
import SaveDialog, { SaveDialogHandler } from '../SaveDialog'

type ContactWithValid = Contact & { isValid: boolean }

const generateContact = (id: string): ContactWithValid => ({
  id,
  phoneFor: phoneLabels[0].key,
  phoneCode: phoneCountries[0].key,
  phoneNumber: undefined,
  isValid: false,
})

interface Props {
  listOfContacts?: Contact[]
  onSubmit: (contacts: Contact[]) => void
}

export default function ContactListForm({ listOfContacts, onSubmit }: Props) {
  const { handleSubmit } = useForm()

  const initialVal = listOfContacts?.length || 0
  const [nextVal, setNextVal] = useState(initialVal + 1)
  const [total, setTotal] = useState(0)
  const [formValid, setFormIsValid] = useState(false)

  const dialogRef = useRef<SaveDialogHandler>(null)

  const initialContacts = () => {
    if (listOfContacts === undefined || listOfContacts.length === 0) {
      return [generateContact(`-new-${initialVal}`)]
    } else {
      return listOfContacts.map((contact) => ({ ...contact, isValid: true }))
    }
  }

  const contacts = useRef(initialContacts())

  const addItem = useCallback(() => {
    setNextVal(nextVal + 1)
    setTotal(total + 1)
    contacts.current = [generateContact(`-new-${nextVal}`), ...contacts.current]
  }, [total, nextVal])

  const removeItem = useCallback(
    ({ id }: Contact) => {
      setTotal(total - 1)
      contacts.current = contacts.current.filter(
        ({ id: contactId }) => contactId !== id
      )
    },
    [total]
  )

  const updateChange = useCallback(
    (id: string) =>
      (
        name: string,
        value: {
          [key: string]: unknown
        }
      ) => {
        const matchedContactById = contacts.current.find(
          ({ id: contactId }) => id === contactId
        )
        const key = generateId(id)
        matchedContactById[name.substring(0, name.length - key.length)] =
          value[name]
      },
    []
  )

  const updateFormValidity = useCallback(
    (id: string) => (isValid: boolean) => {
      const matchedContactById = contacts.current.find(
        ({ id: contactId }) => id === contactId
      )
      matchedContactById.isValid = isValid
    },
    []
  )
  const renderSavedInformation = () => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Phone For</TableCell>
              <TableCell>Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.current.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell component="th" scope="row">
                  {contact.phoneFor}
                </TableCell>
                <TableCell>
                  ({contact.phoneCode}) - {contact.phoneNumber}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  const onSubmitForm = () => {
    setFormIsValid(false)
    const hasInvalidForm = contacts.current.find(
      (contact) => contact.isValid === false
    )
    if (hasInvalidForm) {
      setFormIsValid(true)
    } else {
      onSubmit(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        contacts.current.map(({ isValid, ...others }) => {
          return others
        })
      )
      dialogRef.current.openSaveDialog()
    }
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmitForm)}>
      <Listing
        addItem={addItem}
        removeItem={removeItem}
        items={contacts.current}
        renderItem={(contact) => (
          <ContactForm
            {...contact}
            changeCallback={updateChange(contact.id)}
            changeIsValid={updateFormValidity(contact.id)}
          />
        )}
        getIndexKey={(contact) => contact.id}
      />

      {formValid && (
        <>
          <hr />
          <Alert severity="error">Form contains error.</Alert>
        </>
      )}
      <Button
        type="submit"
        color="secondary"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Save Contacts
      </Button>

      <SaveDialog
        ref={dialogRef}
        renderSavedInformation={renderSavedInformation}
      />
    </Box>
  )
}
