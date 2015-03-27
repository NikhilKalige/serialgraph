var Reflux = require("reflux");
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


