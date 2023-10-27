const SignOut = ({ onSignOut }: { onSignOut: () => Promise<void> }) => {
  void onSignOut()

  return <>Signing out</>
}

export default SignOut
