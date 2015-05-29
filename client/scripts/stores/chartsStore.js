var Marty = require('marty');
var Immutable = require('immutable');
var ChartConstants = require('../constants/constants').ChartConstants;
var shortid = require('shortid');
var Chart = require('../utils/utils');

module.exports = Marty.createStore({
    id: 'Charts Config',
    handlers: {
        addGraphForm: ChartConstants.ADD_GRAPH_FORM,
        updateConfig: ChartConstants.UPDATE_CHART_CONFIG
    },
    getInitialState: function() {
        return Immutable.Map({});
    },
    updateConfig: function(chartId, config) {
        config = config.set('valid', true);
        this.state = this.state.set(chartId, config);
    },
    updateVarCount: function(count) {
        this.state = this.state.set('variableCount', count);
    },
    getCharts: function(id) {
        return this.fetch({
            id: 'charts-config',
            locally: function() {
                return this.state;
            }
        });
    },
    addGraphForm: function() {
        var id = shortid.generate();
        this.state = this.state.set(id, new Chart());
    }
});



