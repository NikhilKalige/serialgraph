var Marty = require('marty');
var GraphConstants = require('../constants/constants').GraphConstants;

module.exports = Marty.createActionCreators({
    id: 'GraphActionCreators',
    updateConfig: function(obj) {
        this.dispatch(GraphConstants.UPDATE_CONFIG, obj);
    }
});
