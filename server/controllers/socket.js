var Socket = require("socket.io");
var Serial = require("../serial/main");

module.exports = function(app) {
    var server = require('http').Server(app);
    var io = Socket(server);
    server.listen(8000);

    io.on('connection', function (socket) {
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
        Serial.list(socket);
        Serial.connect(socket);
        Serial.close(socket);
    });
}
