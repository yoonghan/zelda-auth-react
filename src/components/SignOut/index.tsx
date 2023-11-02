import type { OnSignOut } from '../../types/authentication'

const SignOut = ({ onSignOut }: { onSignOut: OnSignOut }) => {
  void onSignOut()

  return <>Signing out</>
}

export default SignOut
