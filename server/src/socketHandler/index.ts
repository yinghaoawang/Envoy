import type { Message } from '../types';

module.exports = (io: any) => {
  io.on('connect', (socket: any) => {
    // console.log('io', socket.handshake.session.id);

    io.emit('ping', { createdAt: Date.now() });

    socket.on('message', (payload: Message) => {
      console.log(socket.handshake.session.passport.user);
    });
  });
};
