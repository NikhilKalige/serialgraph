var Reflux = require('reflux');
var Actions = require('../actions/actions');
var SerialStore = require('./serialStore');

module.exports = Reflux.createStore({
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
});


