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

interface Login {
  email: string;
  password: string;
}

interface Chat {
  _id: string;
  members: Array<string>;
  createdAt: Date;
  updatedAt: Date;
}

interface RecipientUser {
  _id: string;
  createdAt: Date;
  email: string;
  name: string;
  updatedAt: string;
}

interface Message {
  _id: string;
  chatId: string;
  senderId: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

interface OnlineUser {
  socketId: string;
  userId: string;
}

export type { Register, User, Login, Chat as ChatType, RecipientUser, Message, OnlineUser };
