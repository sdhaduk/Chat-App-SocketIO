import React, { useContext } from "react";
import { ChatType, OnlineUser, User } from "../../types/types";
import { useFetchRecipient } from "../../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import profile from "../../assets/profile.svg";
import { ChatContext } from "../../context/ChatContext";

interface Props {
  chat: ChatType;
  user: User;
}

const UserChat: React.FC<Props> = ({ chat, user }: Props) => {
  const { recipientUser } = useFetchRecipient(chat, user);
  const { onlineUsers } = useContext(ChatContext);

  const isOnline = onlineUsers?.some((user: OnlineUser) => user?.userId === recipientUser?._id)
 
 
  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={profile} height="40px" />
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">Messages</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">12/12/2012</div>
        <div className="this-user-notifications">2</div>
        <span className={isOnline ? "user-online" : "user-offline"}></span>
      </div>
    </Stack>
  );
}; 

export default UserChat;
