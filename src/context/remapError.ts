const firebaseText = 'Firebase:'

const firebaseMapper = {
  'Firebase: Error (auth/invalid-login-credentials).':
    'Invalid username and password.',
  'Firebase: Error (auth/email-already-in-use).': 'Email already exists.',
  'Firebase: Domain not whitelisted by project (auth/unauthorized-continue-uri).':
    'System configuration issue, please contact admin.',
}

export const remapAuthenticationError = (
  errorMessage: string | null | undefined
) => {
  if (errorMessage === null || errorMessage === undefined) {
    return errorMessage
  }

  const cleanError = errorMessage.trim()
  if (cleanError.startsWith(firebaseText)) {
    return (
      firebaseMapper[cleanError] ??
      `Issue -${cleanError.substring(firebaseText.length)}`
    )
  }
  return cleanError
}
