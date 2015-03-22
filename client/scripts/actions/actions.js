var Reflux = require("reflux");
var $ = jQuery;
var socket = io.connect('http://localhost:8000');

var actions = Reflux.createActions({
    "serialPortGet": {},
    "serialPortGot": {},
    "serialPortSet": {},
    "serialPortData": {}
});

actions.serialPortGet.preEmit = function() {
    socket.emit('serialport');
    socket.on('serialport', function(data) {
        actions.serialPortGot(data);
    })
}

actions.serialPortSet.listen(function(data) {
    socket.emit('serialportset', data);
});

socket.on('serialportdata', function(data) {
    // console.log(data);
    actions.serialPortData(data);
})
/*actions.serialPortGet.listen(function() {
    $.get("/serialport", function(data) {
        console.log(data);
    })
    return "Nikhil";
})*/

module.exports = actions;
