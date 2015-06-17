var Marty = require('marty');
var Immutable = require('immutable');
var DataConstants = require('../constants/constants').DataConstants;
var GraphStore = require('./graphStore');

module.exports = Marty.createStore({
    id: 'Data Store',
    handlers: {
        updateData: DataConstants.UPDATE_DATA
    },

    getInitialState: function() {
        return Immutable.Map({
            data: Immutable.List()
        });
    },

    updateData: function(data) {
        var arr;
        var delimFetch = GraphStore.getDelimiter();
        delimFetch.when({
            done: (function(delim) {
                var dataArr = data.split(delim).filter(Boolean);
                for(var i = 1; i <= dataArr.length; i++) {
                    if(this.state.has(i.toString())) {
                        arr = this.state.get(i.toString());
                        var value = parseInt(dataArr[i-1]);
                        if(isNaN(value))
                            value = 0;
                        arr = arr.push(value);
                    }
                    else {
                        arr = Immutable.List([dataArr[i-1]]);
                    }

                    this.state = this.state.set(i.toString(), arr)
                }
            }).bind(this)
        });
    },

    getData: function() {
        return this.state;
    }
});
