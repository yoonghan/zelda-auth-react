import Alert from '@mui/material/Alert'
import { FieldErrors, FieldValues } from 'react-hook-form/dist/types'

export function useFormError(errors: FieldErrors<FieldValues>) {
  const inputErrors = () => {
    const keys = Object.keys(errors)

    if (keys.length === 0) {
      return undefined
    }

    return (
      <ul>
        {keys.map((error) => (
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          <li key={error}>{errors[error].message?.toString()}</li>
        ))}
      </ul>
    )
  }

  const renderError = () => {
    const errors = inputErrors()
    if (errors) {
      return <Alert severity="error">{errors}</Alert>
    } else {
      return null
    }
  }

  return {
    inputErrors,
    renderedError: renderError(),
  }
}
