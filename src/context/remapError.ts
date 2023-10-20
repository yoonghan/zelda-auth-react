const firebaseText = "Firebase:";

export const remapAuthenticationError = (
  errorMessage: string | null | undefined
) => {
  if (errorMessage === null || errorMessage === undefined) {
    return errorMessage;
  }

  const cleanError = errorMessage.trim();
  if (cleanError.startsWith(firebaseText)) {
    switch (cleanError) {
      case "Firebase: Error (auth/invalid-login-credentials).":
        return "Invalid username and password.";
      case "Firebase: Error (auth/email-already-in-use).":
        return "Email already exists.";
      default:
        return `Issue -${cleanError.substring(firebaseText.length)}`;
    }
  }
  return cleanError;
};
