var Marty = require('marty');
var ButtonConstants = require('../constants/constants').ButtonConstants;

module.exports = Marty.createActionCreators({
    id: 'ButtonsActionCreators',
    updateButtons: function(btn_name) {
        this.dispatch(ButtonConstants.UPDATE_BUTTONS, btn_name);
    }
});
