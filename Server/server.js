const express = require('express');
const path = require('path');
const app = express();  // Сначала нужно инициализировать `app`
const http = require('http').Server(app);
const io = require('socket.io')(http);
const filePath = path.resolve(__dirname, '..', 'Client', 'index.html');

// Настройка маршрута для отправки HTML-файла
app.get('/', function(req, res){
  res.sendFile(filePath);
});

// Работа с WebSocket через Socket.io
io.on('connection', function(socket){
  console.log('user connected');
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

// Запуск сервера
http.listen(3000, function(){
  console.log('listening on *:3000');
});
