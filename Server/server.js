const express = require('express');
const path = require('path');
const app = express();

// Указываем Express на папку Client для обслуживания статических файлов
app.use(express.static(path.join(__dirname, '..', 'Client')));

// Обслуживание index.html по корневому маршруту
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '..', 'Client', 'index.html'));
});

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
