'use strict';
var React = require('react');
var Reflux = require("reflux");

var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;
var Button = require('react-bootstrap').Button;
var Switch = require("./switch.jsx");

var Actions = require("../actions/actions");
var ButtonStore = require("../stores/buttons");

module.exports = React.createClass({
  mixins: [Reflux.listenTo(ButtonStore, 'onStoreUpdate')],

  getInitialState: function() {
    var data = ButtonStore.buttons;
    return {
      lines: [],
      console: ButtonStore.buttons.console,
      pause: ButtonStore.buttons.pause,
    }
  },

  onStoreUpdate: function(data) {
    this.setState({
      console: data.console,
      pause: data.pause
    })
  },

  onToggle: function(name) {
    Actions.buttonToggle(name);
  },

  buttonClick: function(ev) {
    Actions.buttonToggle(ev.target.title);
  },

  pauseToggle: function() {
    this.setState({
      pause_state: !this.state.pause_state
    });
  },

  render: function() {
    return (
      <div className="container">
        <Row className="text-center">
          <Col md={6}>
            <Switch on={this.state.console} name={"Console"}
              onToggle={this.onToggle} />
          </Col>
          <Col md={6}>
            <Switch on={this.state.pause} name={"Pause"}
              onToggle={this.onToggle} />
          </Col>
        </Row>
      </div>
    );
  }
})
