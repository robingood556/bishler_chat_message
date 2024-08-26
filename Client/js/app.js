// app.js
var app = angular.module('myApp', []);

app.controller('mainController', function($scope) {
    var socket = io(); // Подключаемся к серверу

    $scope.messages = []; // Список сообщений

    // Обработка входящих сообщений
    socket.on('chat message', function(msg) {
        $scope.$apply(function() {
            $scope.messages.push(msg);
        });
    });

    // Отправка сообщений
    $scope.send = function() {
        if ($scope.message.trim()) {
            socket.emit('chat message', $scope.message);
            $scope.message = ''; // Очищаем поле ввода после отправки
        }
    };
});
