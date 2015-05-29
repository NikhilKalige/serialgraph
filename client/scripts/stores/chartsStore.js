var Marty = require('marty');
var Immutable = require('immutable');
var ChartConstants = require('../constants/constants').ChartConstants;
var shortid = require('shortid');

var Chart = Immutable.Record({
    title: '',
    xlabel: '',
    ylabel: '',
    variables: [],
    valid: false

});

module.exports = Marty.createStore({
    id: 'Charts Config',
    handlers: {
        addGraphForm: ChartConstants.ADD_GRAPH_FORM,
    },
    getInitialState: function() {
        return Immutable.Map({});
    },
    updateConfig: function(config) {
        this.state = this.state.set('delimiter', config.get('delimiter'));
        this.state = this.state.set('sampleLine', config.get('sampleLine'));
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



