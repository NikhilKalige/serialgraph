var Marty = require('marty');
var ChartConstants = require('../constants/constants').ChartConstants;

module.exports = Marty.createActionCreators({
    id: 'GraphFormActionCreators',
    addGraphForm: function() {
        this.dispatch(ChartConstants.ADD_GRAPH_FORM);
    }
});
