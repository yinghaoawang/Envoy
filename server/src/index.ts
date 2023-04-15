import config from './config';

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
const { prisma } = require('./helpers/prismaHelper');
const passport = require('passport');
const session = require('express-session');

const PORT_NUMBER: number = 1270;

app.use(express.static(__dirname + '/public'));
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

require('./routes')(app);

io.on('connection', (socket: any) => {
  socket.on('clicked', (data: any) => {
    io.emit('buttonUpdate');
  });
});

server.listen(1270, () => {
  console.log('listening on *:1270');
});
