import React, { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";
import { User, Register, Login } from "../types/types";

export const AuthContext = createContext<any>({});

interface Props {
  children: React.ReactNode;
}

export const AuthContextProvider: React.FC<Props> = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [registerError, setRegisterError] = useState<object | null>(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<object | null>(null);
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);

  const [loginInfo, setLoginInfo] = useState<Login>({
    email: "",
    password: "",
  });

  const [registerInfo, setRegisterInfo] = useState<Register>({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("User");
    user ? setUser(JSON.parse(user)) : setUser(null);
  }, []);

  const updateRegisterInfo = useCallback((info: Register) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info: Login) => {
    setLoginInfo(info);
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

  const loginUser = useCallback(
    async (e: Event) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);

      const response = await postRequest(
        `${baseUrl}/users/login`,
        JSON.stringify(loginInfo)
      );

      setIsLoginLoading(false);

      if (response.error) {
        return setLoginError(response);
      } else {
        localStorage.setItem("User", JSON.stringify(response));
        setUser(response);
      }
    },
    [loginInfo]
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
        updateLoginInfo,
        loginUser,
        loginError,
        isLoginLoading,
        loginInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
