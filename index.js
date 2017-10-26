let express = require('express');

const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/css'));

io.on('connection', (socket) => {
	socket.on('chat.message', (payload) => {
		io.emit('chat.message', {
      username: payload.userNameP,
      msj: payload.newMessageP
    });
	});
});

server.listen(port, () => {
  console.log('listening on *:' + port);
});