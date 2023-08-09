import { ReactNode, createContext, useEffect, useState } from "react";
import { auth$, login } from "@walcron/zelda-shared-context";

type Props = {
  onSignIn: (username: string, password: string) => void;
  onSignOut: () => void;
  error: string | undefined;
};

export const defaultProps: Props = {
  onSignIn: (username: string, password: string) => {
    //empty
  },
  onSignOut: () => {
    //empty
  },
  error: undefined,
};

const AuthenticationContext = createContext(defaultProps);

export const AuthenticationConsumer = AuthenticationContext.Consumer;

export const AuthenticationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [error, setError] = useState("");

  useEffect(() => {
    const sub = auth$.subscribe(({ error }) => {
      setError(error);
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
        onSignOut: () => {},
        error,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
