import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services.ts";
import { User, ChatType, Message } from "../types/types.ts";

interface Props {
  children: React.ReactNode;
  user: User;
}

export const ChatContext = createContext<any>({});

export const ChatContextProvider: React.FC<Props> = ({
  children,
  user,
}: Props) => {
  const [userChats, setUserChats] = useState<ChatType[] | null>(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState<boolean>(false);
  const [userChatsError, setUserChatsError] = useState<object | null>(null);
  const [potentialChats, setPotentialChats] = useState<User[]>([]);
  const [currentChat, setCurrentChat] = useState<ChatType | null>(null);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [messagesError, setMessagesError] = useState<object | null>(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState<boolean>(false);

  console.log("messages", messages);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users`);

      if (response.error) {
        return console.log(response.error);
      }

      const pChats = response.filter((u: User) => {
        let isChatCreated = false;

        if (user?._id === u._id) return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }

        return !isChatCreated;
      });

      setPotentialChats(pChats);
    };

    getUsers();
  }, [userChats]);

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

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);

      const response = await getRequest(
        `${baseUrl}/messages/${currentChat?._id}`
      );

      setIsMessagesLoading(false);

      if (response.error) {
        return setMessagesError(response);
      }

      setMessages(response);
    };

    getMessages();
  }, [currentChat]);

  const createChat = useCallback(async (firstId: string, secondId: string) => {
    const response = await postRequest(
      `${baseUrl}/chats`,
      JSON.stringify({ firstId, secondId })
    );

    if (response.error) {
      return console.log(response.error);
    }

    setUserChats((prev: any) => [...prev, response]);
  }, []);

  const updateCurrentChat = useCallback((chat: ChatType) => {
    setCurrentChat(chat);
  }, []);

  return (
    <>
      <ChatContext.Provider
        value={{
          userChats,
          isUserChatsLoading,
          userChatsError,
          potentialChats,
          createChat,
          updateCurrentChat,
          messages,
          isMessagesLoading,
          messagesError
        }}
      >
        {children}
      </ChatContext.Provider>
    </>
  );
};
