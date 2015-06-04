var Reflux = require('reflux');
var Marty = require('marty');
var Immutable = require('immutable');
var SerialConstants = require('../constants/constants').SerialConstants;
var GraphConstants = require('../constants/constants').GraphConstants;

/*module.exports = Reflux.createStore({
    listenables: Actions,

    init: function() {
        this.data = {};
        this.data.graph_data = [[]];
        this.listenTo(SerialStore, this.gotSerialData);
    },

    onGraphUpdate: function(data) {
        var graph = this.data.graph_data;
        this.data = data;
        this.data.graph_data = graph;
        this.trigger(this.data);
    },

    gotSerialData: function(data) {
        if(this.data.data) {
            //var arr = data.split(this.data.data.delimiter);
            var arr = data.split(" ");
            for(var i=0; i<arr.length; i++) {
                if(!this.data.graph_data[i]) {
                    this.data.graph_data[i] = [];
                }
                this.data.graph_data[i].push(parseInt(arr[i], 10));
            }
            this.trigger(this.data);
        }
    }
});*/

module.exports = Marty.createStore({
    id: 'Graph Config',
    handlers: {
        updateConfig: GraphConstants.UPDATE_CONFIG,
        updateVarCount: GraphConstants.UPDATE_VARIABLECOUNT
    },
    getInitialState: function() {
        return Immutable.Map({
            delimiter: ' ',
            sampleLine: null,
            variableCount: 0
        });
    },
    updateConfig: function(config) {
        this.state = this.state.set('delimiter', config.get('delimiter'));
        this.state = this.state.set('sampleLine', config.get('sampleLine'));
        this.updateVarCount();
    },
    updateVarCount: function() {
        var count;
        count = this.state.get('sampleLine')
            .split(this.state.get('delimiter'))
            .filter(Boolean)
            .length;
        this.state = this.state.set('variableCount', count);
    },
    getConfig: function() {
        return this.fetch({
            id: 'graph-config',
            locally: function() {
                return this.state;
            }
        });
    },
    getVariableCount: function() {
        return this.fetch({
            id: 'graph-count',
            locally: function() {
                return this.state.get('variableCount');
            }
        });
    }
});



