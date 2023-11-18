import React, { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const AuthContext = createContext<any>({});

export const AuthContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [user, setUser] = useState({
    name: "Sagar",
  });

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
