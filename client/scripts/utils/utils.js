var Immutable = require('immutable');
var Chart = Immutable.Record({
    title: '',
    xlabel: '',
    ylabel: '',
    variables: [],
    valid: false
});

module.exports = Chart;
