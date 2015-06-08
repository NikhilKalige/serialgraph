var Marty = require('marty');
var SocketStateSource = require('marty-socket.io-state-source');
var SerialActionCreators = require('../actions/serialActionCreators');
var DataActionCreators = require('../actions/dataActionCreators');

var SerialSocket = Marty.createStateSource({
    id: 'SerialSocket',

    mixins: [SocketStateSource()],

    url: 'http://localhost:8000',

    events: {
        'serialport': 'onGetPort',
        'serialportdata': 'onGotData'
    },

    onGetPort: function(ports) {
        SerialActionCreators.updatePortList(ports);
    },

    triggerGetPorts: function() {
        setInterval((function() {
            this.socket.emit('serialport');
        }.bind(this)), 20 * 1000);
        this.socket.emit('serialport');
    },

    onGotData: function(data) {
        DataActionCreators.updateData(data);
    }

    /*onMessage: function (message) {
        if (!MessagesStore.getMessage(message.id, message.roomId)) {
            MessageActionCreators.recieveMessages(message.roomId, [message]);
        }
    },
    onRoomCreated: function (room) {
        if (!RoomsStore.roomExists(room.id)) {
            RoomActionCreators.recieveRooms([room]);
        }
    }*/
});

module.exports = SerialSocket;
