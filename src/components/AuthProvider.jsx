import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const ctxValue = {
    auth,
    setAuth,
  };
  return <AuthContext value={ctxValue}>{children}</AuthContext>;
};

export default AuthContext;
