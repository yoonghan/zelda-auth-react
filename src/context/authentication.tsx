import { ReactNode, createContext, useEffect, useState } from "react";
import { auth$, login, logout } from "@walcron/zelda-shared-context";

type Props = {
  onSignIn: (username: string, password: string) => void;
  onSignOut: () => void;
  error: string | undefined;
  loggedIn: boolean;
};

export const defaultProps: Props = {
  onSignIn: (username: string, password: string) => {
    //empty
  },
  onSignOut: () => {
    //empty
  },
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
      setError(error);
      setLoggedIn(sessionToken !== null);
    });
    return () => {
      sub.unsubscribe();
    };
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{
        onSignIn: (username: string, password: string) => {
          login(username, password);
        },
        onSignOut: () => {
          logout();
        },
        error,
        loggedIn,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
