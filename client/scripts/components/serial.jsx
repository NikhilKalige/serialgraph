var React = require('react');
var Reflux = require("reflux");
var Actions = require("../actions/actions");
var SerialStore = require("../stores/serial");
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var OverlayMixin = require('react-bootstrap').OverlayMixin;
var Input = require('react-bootstrap').Input;

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

var Serial = React.createClass({
  mixins: [
    OverlayMixin,
    Reflux.listenTo(SerialStore, 'onStoreUpdate')
  ],


  getInitialState: function () {
    return {
      isModalOpen: false,
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

  handleToggle: function () {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
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

  submit: function(e) {
    e.preventDefault();
    if(this.state.temp.Ports == "") {
      this.state.temp.Ports = this.state.ports[0];
    }
    if(this.state.temp.Baud == "") {
      this.state.temp.Baud = this.props.baud[0];
    }
    this.setState({
      selected: this.state.temp
    });
    Actions.serialPortSet(this.state.temp);
  },

  render: function () {
    return (
      <Button onClick={this.handleToggle} bsStyle="primary">Serial Config</Button>
    );
  },

  renderOverlay: function () {
    if(!this.state.isModalOpen) {
      return <span/>;
    }

    return (
      <Modal bsStyle="primary" onSubmit={this.submit} title="Modal heading" onRequestHide={this.handleToggle}>
        <div className="modal-body">
          <form className="form-horizontal">
            <Dropdown title="Ports" change={this.onChange} selected={this.state.selected.Ports}
              data={this.state.ports} />
            <Dropdown title="Baud" change={this.onChange} selected={this.state.selected.Baud}
              data={this.props.baud} />
            <div className="form-group">
              <Button type="submit" value="Submit" className="col-md-offset-8 col-md-2"
                >Submit</Button>
            </div>
          </form>
        </div>
        <div className="modal-footer">
          <Button onClick={this.handleToggle}>Close</Button>
        </div>
      </Modal>
    );
  }
});

module.exports = Serial;
