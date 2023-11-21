import React, { createContext, useCallback, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

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
  const [registerError, setRegisterError] = useState<object | null>(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState<boolean>(false);
  const [registerInfo, setRegisterInfo] = useState<Register>({
    name: "",
    email: "",
    password: "",
  });

  const updateRegisterInfo = useCallback((info: Register) => {
    setRegisterInfo(info);
  }, []);

  const registerUser = useCallback(async (e:Event) => {
    e.preventDefault()  
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
  }, [registerInfo]);

  return (
    <AuthContext.Provider value={{ user, registerInfo, updateRegisterInfo, registerError, registerUser, isRegisterLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
