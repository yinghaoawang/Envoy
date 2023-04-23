import { Socket } from 'socket.io';

export interface AppSocket extends Socket {
  handshake: {
    session: any
    headers: any,
    time: any, 
    address: any,
    xdomain: any,
    secure: any,
    issued: any,
    url: any,
    query: any,
    auth: any
  }
}

export interface User {
  id: string;
}

export interface SocketUser {
  socketId: string;
  user: User;
}

export interface Channel {
  id: string;
}

export interface Message {
  channel: {
    id: string;
  };
  message: string;
}