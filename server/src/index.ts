export {};
const config = require('./config');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
const session = require('express-session');
const cache = require('./cache');

cache.init();

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

server.listen(config.PORT, () => {
  console.log(`Listening on *: ${config.PORT}`);
});
