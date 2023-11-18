import React, { createContext, useCallback, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface Register {
  name: string;
  email: string;
  password: string;
}

export const AuthContext = createContext<any>({});

export const AuthContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [user, setUser] = useState(null);
  const [registerInfo, setRegisterInfo] = useState<Register>({
    name: "",
    email: "",
    password: "",
  });

  const updateRegisterInfo = useCallback((info: Register) => {
    setRegisterInfo(info);
  }, []);

  return (
    <AuthContext.Provider value={{ user, registerInfo, updateRegisterInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
