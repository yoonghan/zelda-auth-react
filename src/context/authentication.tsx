import { ReactNode, createContext, useEffect, useState } from "react";
import {
  type EmailPasswordResetResponse,
  auth$,
  create,
  login,
  logout,
  resetEmail,
} from "@walcron/zelda-shared-context";
import { remapAuthenticationError } from "./remapError";

type Props = {
  onSignIn: (username: string, password: string) => void;
  onCreate: (username: string, password: string) => void;
  onSignOut: () => void;
  onSendEmailToResetPassword: (
    email: string
  ) => Promise<EmailPasswordResetResponse>;
  error: string | undefined;
  loggedIn: boolean;
};

export const defaultProps: Props = {
  onCreate: (username: string, password: string) => {
    //empty
  },
  onSignIn: (username: string, password: string) => {
    //empty
  },
  onSignOut: () => {
    //empty
  },
  onSendEmailToResetPassword: async (email: string) => ({
    isSent: false,
    error: undefined,
  }),
  error: undefined,
  loggedIn: false,
};

const AuthenticationContext = createContext(defaultProps);

export const AuthenticationConsumer = AuthenticationContext.Consumer;

export const AuthenticationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const sub = auth$.subscribe(({ error, sessionToken }) => {
      setError(remapAuthenticationError(error));
      setLoggedIn(sessionToken !== null);
    });
    return () => {
      sub.unsubscribe();
    };
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        onCreate: (username: string, password: string) => {
          create(username, password);
        },
        onSignIn: (username: string, password: string) => {
          login(username, password);
        },
        onSignOut: () => {
          logout();
        },
        onSendEmailToResetPassword: async (email: string) => {
          const response = await resetEmail(
            email,
            "https://zelda.walcron.com/auth/resetpassword"
          );
          return {
            ...response,
            error: setError(response?.error),
          };
        },
        error,
        loggedIn,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
