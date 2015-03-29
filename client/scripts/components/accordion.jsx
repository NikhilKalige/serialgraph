var React = require('react');
var Reflux = require('reflux');

var ButtonStore = require('../stores/buttons');
var Serial = require('./serial.jsx');

module.exports = React.createClass({
  mixins: [Reflux.listenTo(ButtonStore, 'onStoreUpdate')],
  getInitialState: function() {
    return {
      serial: ButtonStore.buttons.serial,
      graph: ButtonStore.buttons.graph
    };
  },

  onStoreUpdate: function(data) {
    this.setState({
      serial: data.serial,
      graph: data.graph
    });
  },

  render: function() {
    var content = '';
    if(this.state.serial)
      content = <Serial/>;
    else if(this.state.graph)
      content = "";

    return (
      <div className="container">
        <Serial/>
      </div>
    );
  }
});

