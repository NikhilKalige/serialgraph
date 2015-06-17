var SerialPort = require('serialport');

var port;

module.exports = {
    list: function(socket) {
        //var count = 0;

        var data = 0;
        socket.on('serialport', function() {
            SerialPort.list(function(err, ports) {
                var list = [];
                if(err)
                    return;
                if(ports.length > 0) {
                    ports.forEach(function(port) {
                        list.push(port.comName);
                    });
                    socket.emit('serialport', list);
                }
            });
            /** Testing without any device connected */
            /*if(count == 0)
                socket.emit('serialport', ['dev/ttyUSB0', '/dev/ttyUSB1']);
            else if(count == 1)
                socket.emit('serialport', ['dev/ttyUSB7', '/dev/ttyUSB1', '/dev/ttyUSB2']);
            else if(count == 2)
                socket.emit('serialport', ['dev/ttyUSB2', '/dev/ttyUSB1', '/dev/ttyUSB8']);
            else {
                socket.emit('serialport', ['dev/ttyACM0', '/dev/ttyUSB12']);
                count = 0;
            }

            count++;*/

            /*if(data == 0) {
                data = 1;
                console.log("sedning 2");
                setInterval((function() {
                    console.log("sedning 1");
                    var d = []
                    d.push(Math.random()*101|0);
                    d.push(Math.random()*101|0);
                    d.push(Math.random()*101|0);
                    socket.emit('serialportdata', d.join(' '));
                }.bind(this)), 1 * 1000);
            }*/
        });
    },

    connect: function(socket) {
        socket.on('serialportset', function(data) {
            console.log(data);
            port = new SerialPort.SerialPort(data.Ports, {
                baudRate: data.Baud,
                parser: SerialPort.parsers.readline('\n')
            });
            port.on('error', function(data) {
                console.log(data);
                socket.emit('serialporterror');
            });
            port.on('open', function() {
                console.log('open');
                socket.emit('serialportopen');
                port.on('data', function(data) {
                    // console.log(data);
                    socket.emit('serialportdata', data);
                });
            });
        });

    },

    close: function(socket) {
        socket.on('disconnect', function() {
            if(port && (port.hasOwnProperty('isOpen')) && port.isOpen()) {
                port.removeAllListeners();
                port.close();
            }
        });
    }
};


