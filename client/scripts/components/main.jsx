var React = require('react');
var Reflux = require("reflux");

var Graph = require("./graph.jsx");
var Console = require("./console.jsx");
var Serial = require("./serial.jsx");
var Switch = require("./switch.jsx");

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
      console_state: true,
      pause_state: false
    }
  },

  onStoreUpdate: function(data) {
    this.setState({
      lines: data
    });
  },

  consoleToggle: function() {
    this.setState({
      console_state: !this.state.console_state
    });
  },

  pauseToggle: function() {
    this.setState({
      pause_state: !this.state.pause_state
    });
  },

  render: function() {
    return (
      <div>
        <div className="container">
          <Row className="text-center">
            <Col md={3}>
                <Graph/>
            </Col>
            <Col md={3}>
                <Serial/>
            </Col>
            <Col md={3}>
                <Switch on={this.state.console_state} name={"Console"}
                  onToggle={this.consoleToggle} />
            </Col>
            <Col md={3}>
                <Switch on={this.state.pause_state} name={"Pause"}
                  onToggle={this.pauseToggle} />
            </Col>
          </Row>
        </div>
        <DisplayConsole lines={this.state.lines} />
      </div>
    );
  }
});

 module.exports = App;
