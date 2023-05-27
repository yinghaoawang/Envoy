import { Socket } from 'socket.io';

export interface AppSocket extends Socket {
  handshake: {
    session: any,
    headers: any,
    time: any,
    address: any,
    xdomain: any,
    secure: any,
    issued: any,
    url: any,
    query: any,
    auth: any,
  }
}

export interface User {
  id: number,
}

export interface SocketUser {
  socketId: string,
  user: User,
}

export interface Channel {
  id: number,
}

export interface ChannelMessage {
  channel: {
    id: number,
  },
  message: string,
}

export interface DirectMessage {
  to: {
    userId: number
  },
  from: {
    userId: number
  },
  chat: DirectMessageChat,
  message: string,
}

export interface DirectMessageChat {
  users: User[],
  messages: DirectMessage[],
}


export interface CacheAction {
  array: any,
}
