const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const { v4: uuidv4 } = require('uuid'); // Импортируем пакет uuid

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Указываем Express на папку Client для статических файлов
app.use(express.static(path.join(__dirname, '..', 'Client')));

const filePath = path.resolve(__dirname, '..', 'Client', 'index.html');

// Обслуживание index.html по корневому маршруту
app.get('/', (req, res) => {
  res.sendFile(filePath);
});

io.on('connection', (socket) => {
  const userId = uuidv4(); // Генерируем уникальный идентификатор для нового пользователя
  socket.emit('userId', userId); // Отправляем уникальный идентификатор клиенту

  console.log('User connected with ID:', userId);

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected with ID:', userId);
  });
});

server.listen(3000, () => {
  console.log('Listening on *:3000');
});
