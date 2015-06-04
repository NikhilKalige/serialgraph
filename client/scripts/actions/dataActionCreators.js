var Marty = require('marty');
var DataConstants = require('../constants/constants').DataConstants;

module.exports = Marty.createActionCreators({
    id: 'DataActionCreators',

    updateData: function(data) {
        this.dispatch(DataConstants.UPDATE_DATA, data);
    }
});
