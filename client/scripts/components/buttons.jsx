'use strict';
var React = require('react');
var Marty = require('marty');
var Reflux = require("reflux");
var Immutable = require('immutable');

var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;
var Button = require('react-bootstrap').Button;
var Switch = require("./switch.jsx");

var Actions = require("../actions/actions");
var ButtonStore = require("../stores/buttonsStore");
var ButtonsActionCreator = require("../actions/buttonsActionCreators");

/*module.exports = React.createClass({
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
})*/


var Buttons = React.createClass({
  onToggle: function(name) {
    ButtonsActionCreator.for(this).updateButtons(name);
  },
  
  render: function() {
    return (
      <div className="container">
        <Row className="text-center">
          <Col md={6}>
            <Switch on={this.props.buttons.get('console_open')} name={"Console"}
              onToggle={this.onToggle} />
          </Col>
          <Col md={6}>
            <Switch on={this.props.buttons.get('paused')} name={"Pause"}
              onToggle={this.onToggle} />
          </Col>
        </Row>
      </div>
    );
  },
});

module.exports = Marty.createContainer(Buttons, {
  listenTo: ButtonStore,
  fetch: {
    buttons() {
      return ButtonStore.for(this).getAll();
    }
  }
})