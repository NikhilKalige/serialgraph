/*var Reflux = require("reflux");
var Actions = require("../actions/actions");

module.exports = Reflux.createStore({
    listenables: Actions,

    init: function() {
        this.buttons = {
            serial: false,
            graph: false,
            console: true,
            pause: false
        }
    },

    onButtonToggle: function(data) {
        this.buttons[data] = !this.buttons[data];
        this.trigger(this.buttons);
    },
});
*/

var Marty = require('marty');
var ButtonConstants = require('../constants/constants').ButtonConstants;
var Immutable = require('immutable');

var buttonStore = Marty.createStore({
    id: 'Buttons',
    handlers: {
        updateButtons: ButtonConstants.UPDATE_BUTTONS
    },
    getInitialState: function() {
        return Immutable.Map({
            console_open: false,
            paused: false
        });
    },
    updateButtons: function(btn_name) {
        var key;
        if(btn_name == 'console')
            key = 'console_open';
        else
            key = 'paused';

        this.state = this.state.set(key, !this.state.get(key));
    },
    getAll: function() {
        return this.fetch({
            id: 'btn-state',
            locally: function() {
                return this.state;
            }
        })
    }
})

module.exports = buttonStore;