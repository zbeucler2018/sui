"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var http = require("http");
var express_1 = require("express");
var app = (0, express_1.default)();
var server = http.createServer(app);
var wss = new ws_1.WebSocket.Server({ server: server });
var clients = new Map();
var handleRequest = function (msg, client) {
    console.log("Got request from ".concat(client.id, ", ").concat(JSON.stringify(msg)));
};
wss.on('connection', function (socket) {
    // handle new client
    var clientId = clients.size + 1;
    var newClient = { websocket: socket };
    clients.set(clientId, newClient);
    console.log("client ".concat(clientId, " connected"));
    // handle incomming message
    socket.on('message', function (_msg) {
        var msg = JSON.parse(_msg);
        handleRequest(msg, newClient);
    });
    // handle client leaving
    socket.on('close', function () {
        // newClient?.zmqSocket.close();
        clients.delete(clientId);
        console.log("Client ".concat(clientId, " disconnected"));
    });
});
var PORT = 3000;
server.listen(PORT, function () {
    console.log('Server running');
});
