var Marty = require('marty');
var SerialConstants = require('../constants/constants').SerialConstants;

module.exports = Marty.createActionCreators({
    id: 'SerialActionCreators',
    updatePortList: function(list) {
        this.dispatch(SerialConstants.UPDATE_PORT_LIST, list);
    },
    updatePort: function(value) {
        this.dispatch(SerialConstants.UPDATE_PORT, value);
    },
    updateBaud: function(value) {
        this.dispatch(SerialConstants.UPDATE_BAUD, value);
    }
})