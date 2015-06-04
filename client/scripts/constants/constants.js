var Marty = require('marty');

var ButtonConstants = Marty.createConstants([
    'UPDATE_BUTTONS'
]);

var SerialConstants = Marty.createConstants([
    'UPDATE_PORT',
    'UPDATE_BAUD',
    'UPDATE_PORT_LIST'
]);

var GraphConstants = Marty.createConstants([
    'UPDATE_CONFIG',
    'UPDATE_VARIABLECOUNT'
]);

var ChartConstants = Marty.createConstants([
    'ADD_GRAPH_FORM',
    'ADD_GRAPH',
    'UPDATE_CHART_CONFIG'
]);

var DataConstants = Marty.createConstants([
    'UPDATE_DATA'
]);

module.exports = {
    ButtonConstants: ButtonConstants,
    SerialConstants: SerialConstants,
    GraphConstants: GraphConstants,
    ChartConstants: ChartConstants,
    DataConstants: DataConstants
};
