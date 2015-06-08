var React = require('react');
var Reflux = require('reflux');

var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var SerialStore = require('../stores/serialStore');
var GraphStore = require('../stores/graphStore');
var ChartStore = require('../stores/chartsStore');
var DataStore = require('../stores/dataStore');

var DisplayConsole = require('./console-display.jsx');
var SerialSocket = require('../sources/serialSocket');

var Graph = require('./graph.jsx');
var GraphForm = require('./graph_form.jsx');
var Console = require('./console.jsx');
var Serial = require('./serial.jsx');
var Buttons = require('./buttons.jsx');
var Chart = require("./chart.jsx");
var AddGraph = require('./add_graph_button.jsx');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
// var ChartsPage = require("./chartpage.jsx");
//var GraphStore = require("../stores/graph.js");


SerialSocket.triggerGetPorts();

var App = React.createClass({
  mixins: [PureRenderMixin],
  /*mixins: [
    Reflux.listenTo(SerialStore, 'onSerialUpdate'),
  ],*/

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
    var graph_forms = [];
    var charts = [];

    graph_forms = this.props.chartConfig.map((function(value, key) {
      return <GraphForm id={key} chartData={value} count={this.props.varCount}/>
    }).bind(this));

    charts = this.props.chartConfig.map((function(value, key) {
      if(value.get('valid'))
        return <Chart id={key} chartData={value} plotData={this.props.plotData}/>
    }).bind(this));

    return (
      <div>
        <Buttons />
        <div className="container">
          <Serial />
          {this.props.serialStatus ? <Graph /> : false}
          {this.props.varCount ? <AddGraph /> : false}
          {this.props.varCount ? graph_forms: false}
          {this.props.varCount ? charts: false}
        </div>
      </div>
    );
  }
});

//<DisplayConsole lines={this.state.lines} />

module.exports = Marty.createContainer(App, {
  listenTo: [SerialStore, GraphStore, ChartStore, DataStore],
  fetch: {
    serialStatus() {
      return SerialStore.for(this).connectionStatus();
    },
    varCount() {
      return GraphStore.for(this).getVariableCount();
    },
    chartConfig() {
      return ChartStore.for(this).getCharts();
    },
    plotData() {
      return DataStore.for(this).getData();
    }
  }
});
