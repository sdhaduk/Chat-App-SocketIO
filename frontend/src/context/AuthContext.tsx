import React, { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

interface Props {
  children: React.ReactNode;
}

interface Register {
  name: string;
  email: string;
  password: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

export const AuthContext = createContext<any>({});

export const AuthContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [registerError, setRegisterError] = useState<object | null>(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState<boolean>(false);
  const [registerInfo, setRegisterInfo] = useState<Register>({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("User") || "{}");
    setUser(user);
  }, []);

  const updateRegisterInfo = useCallback((info: Register) => {
    setRegisterInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e: Event) => {
      e.preventDefault();
      setIsRegisterLoading(true);
      setRegisterError(null);

      const response = await postRequest(
        `${baseUrl}/users/register`,
        JSON.stringify(registerInfo)
      );

      setIsRegisterLoading(false);

      if (response.error) {
        return setRegisterError(response);
      }
      localStorage.setItem("User", JSON.stringify(response));
      setUser(response);
    },
    [registerInfo]
  );

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerError,
        registerUser,
        isRegisterLoading,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
