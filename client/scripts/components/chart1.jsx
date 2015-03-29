var React = require('react');
var Rickshaw = require("rickshaw");

var Chart = React.createClass({
  getInitialState: function() {
    return {
      render: false
    };
  },

  componentDidMount: function() {
    var palette = new Rickshaw.Color.Palette({
      scheme: 'classic9'
    });
    this.graph_node = new Rickshaw.Graph( {
      element: React.findDOMNode(this),
      width: 1100,
      height: 500,
      renderer: 'line',
      stroke: true,
      preserve: true,
      padding: {top: 0.02, left: 0.02, right: 0.02, bottom: 0.02},
      series: [
        {
          color: palette.color(),
          data: this.props.data,
          name: this.props.name
        }
      ]
    });

    this.graph_node.render();
    var hoverDetail = new Rickshaw.Graph.HoverDetail( {
      graph: this.graph_node,
      xFormatter: function(x) {
        return new Date(x * 1000).toString();
      }
    });

    var ticksTreatment = 'glow';

    var xAxis = new Rickshaw.Graph.Axis.Time( {
      graph: this.graph_node,
      ticksTreatment: ticksTreatment,
      timeFixture: new Rickshaw.Fixtures.Time.Local()
    });

    xAxis.render();

    var yAxis = new Rickshaw.Graph.Axis.Y( {
      graph: this.graph_node,
      tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
      ticksTreatment: ticksTreatment
    });

    yAxis.render();
  },

  render: function() {
    if(this["graph_node"])
      this.graph_node.update();
    return (
      <div className="container well"></div>
    );
  }
});

module.exports = Chart;

