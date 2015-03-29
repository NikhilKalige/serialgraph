var Reflux = require("reflux");
var $ = jQuery;
var socket = io.connect('http://localhost:8000');

var actions = Reflux.createActions({
    "serialPortGet": {},
    "serialPortGot": {},
    "serialPortSet": {},
    "serialPortData": {},

    // buttons
    "buttonToggle": {},

    //graphs
    "graphUpdate": {}
});

actions.serialPortGet.preEmit = function() {
    socket.emit('serialport');
    socket.on('serialport', function(data) {
        actions.serialPortGot(data);
    });
};

actions.serialPortSet.listen(function(data) {
    socket.emit('serialportset', data);
});

socket.on('serialportdata', function(data) {
    console.log(data);
    actions.serialPortData(data);
});

actions.graphUpdate.listen(function(data) {
    console.log(data);
});
/*actions.serialPortGet.listen(function() {
    $.get("/serialport", function(data) {
        console.log(data);
    })
    return "Nikhil";
})*/

/*actions.buttonToggle.listen(function(data) {
    actions.buttonToggle(data);
})*/

module.exports = actions;
