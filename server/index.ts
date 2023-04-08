const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
const { prisma } = require('./prismaHelper');

const PORT_NUMBER: number = 1270;

app.use(express.static(__dirname + '/public'));
app.use(cors());

app.get('/', async (req: any, res: any) => {
  const users = await prisma.user.findMany()
  res.json({users})
});

io.on('connection', (socket: any) => {
  socket.on('clicked', (data: any) => {
    io.emit('buttonUpdate');
  });
});

server.listen(1270, () => {
  console.log('listening on *:1270');
});
