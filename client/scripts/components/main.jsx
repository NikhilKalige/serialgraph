var React = require('react');
var Reflux = require("reflux");

var Graph = require("./graph.jsx");
var Console = require("./console.jsx");
var Serial = require("./serial.jsx");
var Buttons = require('./buttons.jsx');

var SerialStore = require("../stores/serial");
var DisplayConsole = require("./console-display.jsx");
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var App = React.createClass({
  mixins: [
    Reflux.listenTo(SerialStore, 'onStoreUpdate')
  ],

  getInitialState: function() {
    return {
      lines: [],
    }
  },

  onStoreUpdate: function(data) {
    this.setState({
      lines: data
    });
  },

  render: function() {
    return (
      <div>
        <Buttons />
        <DisplayConsole lines={this.state.lines} />
      </div>
    );
  }
});

 module.exports = App;
