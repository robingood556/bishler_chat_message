// app.js
var app = angular.module('myApp', []);

app.controller('mainController', function($scope) {
    var socket = io(); // Подключаемся к серверу

    $scope.messages = []; // Список сообщений
    $scope.username = ''; // Имя пользователя
    $scope.message = '';  // Сообщение
    $scope.newUsername = ''; // Временная переменная для нового имени
    $scope.userId = ''; // Уникальный идентификатор пользователя
    $scope.showNameEntry = true; // Показать форму ввода имени

    // Получаем уникальный идентификатор от сервера
    socket.on('userId', function(userId) {
        $scope.userId = userId;
        $scope.$apply(); // Применяем изменения
    });

    // Устанавливаем имя пользователя
    $scope.setUsername = function() {
        if ($scope.newUsername.trim()) {
            $scope.username = $scope.newUsername.trim();
            $scope.newUsername = ''; // Очищаем временную переменную
            $scope.showNameEntry = false; // Скрываем форму ввода имени
        }
    };

    // Отправка сообщений
    $scope.send = function() {
        if ($scope.username.trim() && $scope.message.trim()) {
            socket.emit('chat message', { userId: $scope.userId, user: $scope.username, text: $scope.message });
            $scope.message = ''; // Очищаем поле ввода после отправки
        }
    };

    // Обработка входящих сообщений
    socket.on('chat message', function(msg) {
        $scope.$apply(function() {
            $scope.messages.push(msg);
        });
    });

    // Обработка нажатия клавиши
    $scope.handleKeyPress = function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Предотвратить стандартное поведение Enter
            $scope.send(); // Отправить сообщение
        }
    };
});
