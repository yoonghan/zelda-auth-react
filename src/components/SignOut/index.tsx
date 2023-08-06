import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignOut = ({
  onSignOut,
  redirect,
}: {
  onSignOut: () => void;
  redirect: string;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    onSignOut();
    if (redirect.indexOf("logout") === -1) {
      navigate(redirect);
    }
  }, [navigate, onSignOut, redirect]);

  return <>Signing out</>;
};

export default SignOut;
