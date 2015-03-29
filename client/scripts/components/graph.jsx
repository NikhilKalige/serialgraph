var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var SerialStore = require('../stores/serial');
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var classNames = require('classnames');
var SmallForm = require('./small_form.jsx');

var Serial = React.createClass({
  mixins: [
    Reflux.listenTo(SerialStore, 'onStoreUpdate')
  ],

  getInitialState: function () {
    return {
      clicked: false,
      data: {
        delimiter: ""
      }
    };
  },

  onChange: function(dom) {
    var value = this.state.temp;
    value[dom.target.name] = dom.target.value;
    this.setState({
      temp: value
    });
  },

  clickHandler: function(e) {
    this.setState({
      clicked: !this.state.clicked
    });
  },

  delimiterHandler: function() {
    this.setState({
      data: {
        delimiter: this.refs.f1.getValue()
      }
    });
  },

  render: function () {
    var classes = classNames("collapse-card", {
      "active": this.state.clicked
    });

    var delimiter = {
      label: 'Delimiter',
      submit: true,
      handler: this.delimiterHandler,
      data: this.state.data.delimiter
    };

    return (
      <div className={classes}>
        <div className="collapse-card__heading" onClick={this.clickHandler}>
          <h4 className="collapse-card__title">
            <i className="fa fa-bar-chart"></i>
            Graph settings
          </h4>
        </div>
        <div className="collapse-card__body">
          <SmallForm {...delimiter} ref='f1'/>
        </div>
      </div>
    );
  },
});

module.exports = Serial;

