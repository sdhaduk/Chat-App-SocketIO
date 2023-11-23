import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { OnlineUser, User } from "../../types/types";
import { AuthContext } from "../../context/AuthContext";

const PotentialChats: React.FC = () => {
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="all-users">
        {potentialChats &&
          potentialChats.map((u: User, index: number) => {
            return (
              <div
                className="single-user"
                key={index}
                onClick={() => createChat(user._id, u._id)}
              >
                {u.name}
                <span
                  className={
                    onlineUsers?.some(
                      (user: OnlineUser) => user?.userId === u?._id
                    )
                      ? "user-online"
                      : "user-offline"
                  }
                ></span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PotentialChats;
