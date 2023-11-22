import React, { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { User } from "../../types/types";

const PotentialChats: React.FC = () => {
  const { potentialChats } = useContext(ChatContext);

  return (
    <>
      <div className="all-users">
        {potentialChats &&
          potentialChats.map((u: User, index: number) => {
            return (
              <div className="single-user" key={index}>
                {u.name}
                <span className="user-online"></span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PotentialChats;
