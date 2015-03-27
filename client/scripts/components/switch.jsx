var React = require('react');
var Button = require('react-bootstrap').Button;

module.exports = React.createClass({
  propTypes: {
    onToggle: React.PropTypes.func.isRequired,
    name: React.PropTypes.string.isRequired,
  },
  getDefaultProps: function() {
    return {
      width: 106,
      whole_width: 156,
      sw_width: 52
    }
  },

  render: function() {
    var main_class = 'bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate bootstrap-switch-off';
    var on_class = 'bootstrap-switch-handle-on bootstrap-switch-primary';
    var off_class = "bootstrap-switch-handle-off bootstrap-switch-default";
    var switch_style = {
      width: this.props.whole_width,
      marginLeft: 0
    };
    var self = this;

    var click_handler = function() {
      self.props.onToggle(
        self.props.name.toLowerCase()
      );
    }

    if(this.props.on) {
      switch_style.marginLeft = 0;
    }
    else {
      switch_style.marginLeft = - this.props.sw_width;
    }

    return (
      <div>
        <p style={{display: "inline-block"}}>{this.props.name}</p>
        <div className={main_class} style={{width: this.props.width}}>
          <div onClick={click_handler} className="bootstrap-switch-container" ref="switch" style={switch_style}>
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

