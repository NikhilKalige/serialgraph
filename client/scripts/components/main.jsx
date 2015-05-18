var React = require('react');
var Reflux = require('reflux');

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var SerialStore = require('../stores/serial');
var DisplayConsole = require('./console-display.jsx');

// var Graph = require('./graph.jsx');
var Console = require('./console.jsx');
// var Serial = require('./serial.jsx');
var Buttons = require('./buttons.jsx');
var Chart = require("./chart.jsx");
// var ChartsPage = require("./chartpage.jsx");
var GraphStore = require("../stores/graph.js");

var App = React.createClass({
  mixins: [
    Reflux.listenTo(SerialStore, 'onSerialUpdate'),
  ],

  getInitialState: function() {
    var self = this;
    var data = [];
    return {
      lines: [],
      graph_count: 0,
      data: [],
      graphs: []
    };
  },

  onSerialUpdate: function(data) {
    this.setState({
      lines: data
    });
  },
/*  render: function() {
    var self = this;

    return (
      <div>
        <Buttons />
        <div className="container">
          <Serial />
          <Graph />
        </div>
        <ChartsPage />
      </div>
    );
  }*/
    render: function() {
    var self = this;

    return (
      <div>
        <Buttons />
      </div>
    );
  }
});

 module.exports = App;
//<DisplayConsole lines={this.state.lines} />
