var Reflux = require("reflux");
var Actions = require("../actions/actions");

module.exports = Reflux.createStore({
    listenables: Actions,

    init: function() {
        this.ports = [];
        this.data = [];
        this.graphs = [[]];
        this.baud = [4800, 9600, 19200, 38400, 56800, 115200];
        var self = this;
       /* setInterval(function() {
            var d = Math.round(Math.random() * 40);
            d = d.toString() + " ";
            d = d + Math.round(Math.random() * 40);
          self.data.push(d);
          self.trigger(d);
        }, 1000);*/
    },

    onSerialPortGot: function(data) {
        this.ports = data;
        this.trigger();
    },

    onSerialPortData: function(data) {
        this.data.push(data);
        this.trigger(data);
    }
});
