var Marty = require('marty');

var ButtonConstants = Marty.createConstants([
    'UPDATE_BUTTONS'
]);

var SerialConstants = Marty.createConstants([
    'UPDATE_PORT',
    'UPDATE_BAUD'
]);

module.exports = {
    ButtonConstants: ButtonConstants,
    SerialConstants: SerialConstants
};