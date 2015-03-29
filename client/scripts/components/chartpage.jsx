var React = require('react');
var Reflux = require('reflux');

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var SerialStore = require('../stores/serial');

var Graph = require('./graph.jsx');
var Console = require('./console.jsx');
var Serial = require('./serial.jsx');
var Buttons = require('./buttons.jsx');
var Chart = require("./chart.jsx");

var GraphStore = require("../stores/graph.js");

var ChartsPage = React.createClass({
  mixins: [
    Reflux.listenTo(GraphStore, 'onGraphUpdate')
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

  onGraphUpdate: function(data) {
    console.log(data);
    this.setState({
      graph_count: data.graph_count,
      data: data.graph_data,
      graphs: data.data.graph
    });
  },

  render: function() {
    var self = this;
    var nodes = this.state.graphs.map(function(data, index) {
      return (
        <Chart name={data.title} data={self.state.data[index]}/>
      );
    });

    return (
      <div>
        {nodes}
      </div>
    );
  }
});

 module.exports = ChartsPage;
//<DisplayConsole lines={this.state.lines} />
