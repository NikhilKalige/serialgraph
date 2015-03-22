var Reflux = require("reflux");
var $ = jQuery;

var actions = Reflux.createActions({
    "serialPortGet": {},
    "serialPortGot": {},
    "serialPortSet": {}
});

actions.serialPortGet.preEmit = function() {
    $.get("/serialport", function(data) {
        actions.serialPortGot(data);
    })
}

actions.serialPortSet.listen(function(data) {
    console.log(data);
});
/*actions.serialPortGet.listen(function() {
    $.get("/serialport", function(data) {
        console.log(data);
    })
    return "Nikhil";
})*/

module.exports = actions;
