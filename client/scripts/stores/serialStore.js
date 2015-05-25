var Reflux = require("reflux");
var Actions = require("../actions/actions");
var Marty = require("marty");
var Immutable = require('immutable');
var SerialContants = require('../constants/constants').SerialConstants;

/*module.exports = Reflux.createStore({
    listenables: Actions,

    init: function() {
        this.ports = [];
        this.data = [];
        this.graphs = [[]];
        this.baud = [4800, 9600, 19200, 38400, 56800, 115200];
        var self = this;
        setInterval(function() {
            var d = Math.round(Math.random() * 40);
            d = d.toString() + " ";
            d = d + Math.round(Math.random() * 40);
          self.data.push(d);
          self.trigger(d);
        }, 1000);
    },

    onSerialPortGot: function(data) {
        this.ports = data;
        this.trigger();
    },

    onSerialPortData: function(data) {
        this.data.push(data);
        this.trigger(data);
    }
});*/


module.exports = Marty.createStore({
    id: 'Serial Config',
    handlers: {
        updatePort: SerialContants.UPDATE_PORT,
        updateBaud: SerialContants.UPDATE_BAUD,
        updatePortList: SerialContants.UPDATE_PORT_LIST
    },
    getInitialState: function() {
        return Immutable.Map({
            ports: Immutable.List(),
            bauds: Immutable.List([4800, 9600, 19200, 38400, 56800, 115200]),
            current: Immutable.Map({
                port: null,
                baud: null
            }),
            connected: true
        });
    },
    updateBaud: function(value) {
        this.state = this.state.update('current', function(obj) {
            return obj.set('baud', value);
        });
    },
    updatePort: function(value) {
        this.state = this.state.update('current', function(obj) {
            return obj.set('port', value);
        });
    },
    updatePortList: function(list) {
        this.state = this.state.set('ports', Immutable.List(list));
    },
    getOptions: function() {
        return this.fetch({
            id: 'serial-options',
            locally: function() {
                return {
                    ports: this.state.get('ports'),
                    baud: this.state.get('bauds')
                };
            }
        });
    },
    getSelection: function() {
        return this.fetch({
            id: 'serial-select',
            locally: function() {
                return this.state.get('current');
            }
        });
    },
    connectionStatus: function() {
        return this.fetch({
            id: 'serial-connect',
            locally: function() {
                return this.state.get('connected');
            }
        });
    }
});

