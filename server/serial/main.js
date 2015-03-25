var SerialPort = require("serialport");

var port;

module.exports = {
    list: function(socket) {
        socket.on("serialport", function() {
            SerialPort.list(function(err, ports) {
                var list = [];
                if(err)
                    return;
                if(ports.length > 0) {
                    ports.forEach(function(port) {
                        list.push(port.comName);
                    })
                    socket.emit("serialport", list);
                }
            });
        });
    },

    connect: function(socket) {
        socket.on("serialportset", function(data) {
            console.log(data);
            port = new SerialPort.SerialPort(data.Ports, {
                baudRate: data.Baud,
                parser: SerialPort.parsers.readline("\n")
            });
            port.on("error", function(data) {
                socket.emit("serialporterror");
            })
            port.on("open", function() {
                console.log("open");
                port.on("data", function(data) {
                    socket.emit("serialportdata", data);
                })
            })
        })

    },

    close: function(socket) {
        socket.on("disconnect", function() {
            if(port && (port.hasOwnProperty('isOpen')) && port.isOpen()) {
                port.removeAllListeners();
                port.close();
            }
        });
    }
};


