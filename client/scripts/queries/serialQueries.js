var Marty = require('marty');
var SerialSocket = require('../sources/serialSocket');
var SerialContants = require('../constants/constants').SerialConstants;

var SerialQueries = Marty.createQueries({
  id: 'SerialQueries',
  getMessagesForRoom: function (roomId) {
    return MessagesAPI.for(this).getMessagesForRoom(roomId).then((function (res) {
      this.dispatch(MessageConstants.RECIEVE_MESSAGES, roomId, res.body);
    }).bind(this));
  }
});

module.exports = SerialQueries;
