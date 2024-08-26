// server.js
const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');
const app = express();

// Путь к статическим файлам
app.use(express.static(path.join(__dirname, '..', 'Client')));

// Отдаём HTML файл
app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'Client', 'index.html'));
});

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', function(socket) {
    console.log('user connected');

    // Обработка сообщения от клиента
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg); // Отправляем сообщение всем клиентам
    });

    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

server.listen(3000, function() {
    console.log('listening on *:3000');
});
