export {};
const config = require('./config');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
const session = require('express-session')({
  secret: config.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1200000 }
});

const { prisma } = require('./helpers/prismaHelper');
const cache = require('./cache');

cache.init();

app.use(express.static(__dirname + '/public'));
app.use(cors({ credentials: true, origin: config.CLIENT_HOST }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(session);

require('./routes')(app);
require('./socket')(io);

io.use((socket: any, next: any) => {
  session(socket.handshake, {}, next);
});

server.listen(config.PORT, () => {
  console.log(`Listening on *: ${config.PORT}`);
});
