var React = require('react');
var Button = require('react-bootstrap').Button;

var Console = React.createClass({
  getInitialState: function () {
    return {
      on: false
    }
  },

  getDefaultProps: function() {
    return {
      width: 106,
      whole_width: 156,
      sw_width: 52
    }
  },

  toggleSwitch: function() {
    this.setState({
      on: !this.state.on
    });
  },

  render: function() {
    var main_class = 'bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate bootstrap-switch-off';
    var on_class = 'bootstrap-switch-handle-on bootstrap-switch-primary';
    var off_class = "bootstrap-switch-handle-off bootstrap-switch-default";
    var switch_style = {
      width: this.props.whole_width,
      marginLeft: 0
    };

    if(this.state.on) {
      switch_style.marginLeft = 0;
    }
    else {
      switch_style.marginLeft = - this.props.sw_width;
    }

    return (
      <div>
        <p style={{display: "inline-block"}}>Console</p>
        <div className={main_class} style={{width: this.props.width}}>
          <div onClick={this.toggleSwitch} className="bootstrap-switch-container" ref="switch" style={switch_style}>
            <span className={on_class} style={{width: this.props.sw_width}}>ON</span>
            <span className="bootstrap-switch-label" style={{width: this.props.sw_width}}>&nbsp;</span>
            <span className={off_class} style={{width: this.props.sw_width}}>OFF</span>
            <input type="checkbox" name="my-checkbox" checked=""></input>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Console;
