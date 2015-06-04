var Marty = require('marty');
var Immutable = require('immutable');
var DataConstants = require('../constants/constants').DataConstants;
var GraphStore = require('./graphStore');

module.exports = Marty.createStore({
    id: 'Data Store',
    handler: {
        updateData: DataConstants.UPDATE_DATA
    },

    getInitialState: function() {
        return Immutable.Map({
            data: Immutable.List()
        });
    },

    updateData: function(data) {
        var arr;
        var delim = GraphStore.getDelimiter();
        var dataArr = data.split(delim).filter(Boolean);
        for(var i = 1; i <= dataArr.length; i++) {
            if(this.state.has(i.toString())) {
                arr = this.state.get(i.toString());
                arr = arr.push(dataArr[i-1]);
            }
            else {
                arr = Immutable.List([dataArr[i-1]]);
            }

            this.state = this.state.set(i.toString(), arr)
        }
    }
});
