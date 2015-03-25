var React = require('react');

var console_display = React.createClass({
  render: function() {
    var lines = this.props.lines.map(function(line) {
      return (
        <p style={{margin: 0}}>{line}</p>
      );
    });

    return (
      <div className="container-fluid well">
        {lines}
      </div>
    );
  }
});

module.exports = console_display;
