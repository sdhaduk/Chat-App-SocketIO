import { createContext, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services.ts";
import { User } from "../types/types.ts";

interface Props {
  children: React.ReactNode;
  user: User;
}

export const ChatContext = createContext<any>({});

export const ChatContextProvider: React.FC<Props> = ({
  children,
  user,
}: Props) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState<boolean>(false);
  const [userChatsError, setUserChatsError] = useState<object | null>(null);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);

        const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

        setIsUserChatsLoading(false);

        if (response.error) {
          return setUserChatsError(response);
        }

        setUserChats(response);
      }
    };

    getUserChats();
  }, [user]);

  return (
    <>
      <ChatContext.Provider
        value={{
          userChats,
          isUserChatsLoading,
          userChatsError,
        }}
      >
        {children}
      </ChatContext.Provider>
    </>
  );
};
