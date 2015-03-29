var React = require('react');
var LineChart = require("react-chartjs").Line;

var Chart = React.createClass({
  getInitialState: function() {
    return {
      render: false,
      data: []
    };
  },

  render: function() {
    var labels = [];
    for(var i=0; i<this.props.data.length; i++)
      labels.push(i);

    var simpleLineChartData = {
      labels: labels,
      datasets: [
        {
          label : this.props.name,
          data: this.props.data,
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff"
        }
      ]
    };
    return (
      <div className="container well">
        <LineChart data={simpleLineChartData}
          options={{datasetFill : false, animation: false}}width="1150" height="500" redraw/>
      </div>
    );
  }
});

module.exports = Chart;
