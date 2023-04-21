export interface User {
  id: number;
}

export interface SocketUser {
  socketId: number,
  user: User
}

export interface Channel {
  id: number;
}

export interface Message {
  channel: {
    id: number;
  };
  message: string;
}
