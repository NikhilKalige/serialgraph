var React = require('react');
var LineChart = require('react-chartjs').Line;

var Chart = React.createClass({
  getInitialState: function() {
    return {
      render: false,
      data: []
    };
  },

  getDefaultProps: function() {
    return {
      colors: [
        "rgba(151,187,205,1)",
        "rgba(151,187,151,1)",
        "rgba(205,187,151,1)",
        "rgba(151,151,187,1)"
      ]
    };
  },

  render: function() {
    var datasets = [];
    var labels = [];
    var size = 0;
    this.props.chartData.get('variables').map((function(val) {
      var config;
      if(this.props.plotData.get(val.toString()).size > size)
        size = this.props.plotData.get(val.toString()).size;

      config = {
        label : val,
        data: this.props.plotData.get(val.toString()).toArray(),
        //data: [1,2,3,4,5,6,7,8,12,13,45,68,99,89,23,45,67,88,33,41,34],
        strokeColor: this.props.colors[val],
        pointColor: this.props.colors[val],
        pointStrokeColor: "#fff",
        scaleShowLabels:false
      };
      datasets.push(config);
    }).bind(this));

    for(var i=1; i<=size; i++)
        labels.push(i);

    var simpleLineChartData = {
      labels: labels,
      datasets: datasets
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
