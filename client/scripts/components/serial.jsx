var React = require('react');
var Reflux = require("reflux");
var Actions = require("../actions/actions");
var SerialStore = require("../stores/serialStore");
window.X = SerialStore;
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Input = require('react-bootstrap').Input;
var classNames = require('classnames');
var Marty = require("marty");
var SerialActionCreators = require('../actions/serialActionCreators');

window.Marty = Marty;
var Dropdown = React.createClass({
  render: function() {
    var nodes = this.props.data.map(function(value) {
      return (
        <option value={value}>{value}</option>
      );
    })

    return (
      <div className="form-group">
        <label className="control-label col-xs-2">
          <span>{this.props.title}</span>
        </label>
        <div className="col-xs-10">
          <select type="select" onChange={this.props.change} name={this.props.title}
            defaultValue={this.props.selected} className="form-control">
            {nodes}
          </select>
        </div>
      </div>
    );
  }
});

/*var Serial = React.createClass({
  mixins: [
    Reflux.listenTo(SerialStore, 'onStoreUpdate')
  ],

  getInitialState: function () {
    return {
      clicked: false,
      ports: SerialStore.ports,
      selected: {
        Ports: "",
        Baud: ""
      },
      temp: {
        Ports: "",
        Baud: ""
      }
    };
  },

  getDefaultProps: function() {
    return {
      baud: SerialStore.baud
    }
  },

  componentWillMount: function() {
    Actions.serialPortGet();
  },

  onStoreUpdate: function() {
    this.setState({
      ports: SerialStore.ports
    });
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
    })
  },

  submit: function(e) {
    e.preventDefault();
    if(this.state.temp.Ports == "") {
      this.state.temp.Ports = this.state.ports[0];
    }
    if(this.state.temp.Baud == "") {
      this.state.temp.Baud = this.props.baud[1];
    }
    this.setState({
      selected: this.state.temp
    });
    Actions.serialPortSet(this.state.temp);
  },

  render: function () {
    var classes = classNames(
      "collapse-card",
      {
        "active": this.state.clicked
      }
    );
    return (
      <div className={classes}>
        <div className="collapse-card__heading" onClick={this.clickHandler}>
          <h2 className="collapse-card__title">
            <i className="fa fa-cogs"></i>
            Serial port settings
          </h2>
        </div>
        <div className="collapse-card__body">
          <form className="form-horizontal">
            <Dropdown title="Ports" change={this.onChange} selected={this.state.selected.Ports}
              data={this.state.ports} />
            <Dropdown title="Baud" change={this.onChange} selected={this.state.selected.Baud}
              data={this.props.baud} />
            <div className="form-group">
              <div className="col-xs-offset-2 col-xs-10">
                <Button className="btn-primary" onClick={this.submit} value="Submit">Submit</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
      //<Button onClick={this.handleToggle} bsStyle="primary">Serial Config</Button>
    );
  },
});

module.exports = Serial;*/

var Immutable = require('immutable');


var Serial = React.createClass({
  getInitialState: function () {
    return {
      data: Immutable.Map({
        'clicked': false
      })
    }
  },

  clickHandler: function(e) {
    this.setState(function(prev) {
      return {
        data: prev.data.set('clicked', !prev.data.get('clicked'))
      }
    })
  },

  onChange: function(dom) {
    if(dom.target.name == 'Ports')
      SerialActionCreators.for(this).updatePort(dom.target.value);
    else
      SerialActionCreators.for(this).updateBaud(dom.target.value);
  },

  submit: function(event) {
    event.preventDefault();
    var selection = SerialStore.getSelection();
    if((selection.get('port') != null) && (selection.get('baud') != null)) {
      this.state = this.state.set('clicked', false);
      // Need to call Socket function
    }
    else {
      // Display error message
    }
  },

  render: function () {
    var classes = classNames(
      "collapse-card",
      {
        "active": this.state.data.get('clicked')
      }
    );
    return (
      <div className={classes}>
        <div className="collapse-card__heading" onClick={this.clickHandler}>
          <h2 className="collapse-card__title">
            <i className="fa fa-cogs"></i>
            Serial port settings
          </h2>
        </div>
        <div className="collapse-card__body">
          <form className="form-horizontal">
            <Dropdown title="Ports" change={this.onChange} selected={this.props.selected.get('port')}
              data={this.props.options.ports} />
            <Dropdown title="Baud" change={this.onChange} selected={this.props.selected.get('baud')}
              data={this.props.options.baud} />
            <div className="form-group">
              <div className="col-xs-offset-2 col-xs-10">
                <Button className="btn-primary" onClick={this.submit} value="Submit">Submit</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Marty.createContainer(Serial, {
  listenTo: SerialStore,
  fetch: {
    selected() {
      return SerialStore.for(this).getSelection();
    },
    options() {
      return SerialStore.for(this).getOptions();
    }
  }
});