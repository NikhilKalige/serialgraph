var Immutable = require('immutable');
var Chart = Immutable.Record({
    title: '',
    xlabel: '',
    ylabel: '',
    variables: Immutable.List(),
    valid: false
});

module.exports = Chart;
