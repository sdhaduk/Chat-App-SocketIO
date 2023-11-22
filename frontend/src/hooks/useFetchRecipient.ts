import { useEffect, useState } from "react";
import { ChatType, RecipientUser, User } from "../types/types";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipient = (chat: ChatType, user: User) => {
  const [recipientUser, setRecipientUser] = useState<RecipientUser | null>(
    null
  );
  const [error, setError] = useState<object | null>(null);

  const recipientId = chat?.members?.find((id) => id !== user?._id);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return null;

      const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);

      if (response.error) {
        return setError(error);
      }

      setRecipientUser(response);
    };

    getUser();
  }, [recipientId]);

  return { recipientUser };
};
