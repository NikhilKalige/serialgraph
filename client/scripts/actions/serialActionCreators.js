var Marty = require('marty');
var SerialConstants = require('../constants/constants').SerialConstants;

module.exports = Marty.createActionCreators({
    id: 'SerialActionCreators',
    updatePort: function(value) {
        this.dispatch(SerialConstants.UPDATE_PORT, value);
    },
    updateBaud: function(value) {
        this.dispatch(SerialConstants.UPDATE_BAUD, value);
    }
})