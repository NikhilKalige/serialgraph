var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var SerialStore = require('../stores/serial');
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var classNames = require('classnames');
var SmallForm = require('./small_form.jsx');
var GraphForm = require('./graph_form.jsx');
var Update = require('react/addons').addons.update;

var Serial = React.createClass({
  mixins: [
    Reflux.listenTo(SerialStore, 'onStoreUpdate')
  ],

  getInitialState: function () {
    return {
      clicked: false,
      graph_count: 0,
      data: {
        delimiter: "",
        variable_count: 0,
        graph:[]
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

  addGraphHandler: function() {
    var graph_default = {
      title: "Graph",
      xlabel: "X",
      ylabel: "Y",
      variable: 0,
    };

    var updated_data = Update(this.state.data, {
      graph: {
        $push: [graph_default]
      }
    });

    this.setState({
      graph_count: ++this.state.graph_count,
      data: updated_data
    });
  },

  delimiterHandler: function() {
    this.setState({
      data: {
        delimiter: this.refs.f1.getValue()
      }
    });
  },

  varCountHandler: function() {
    this.setState({
      data: {
        variable_count: this.refs.f2.getValue()
      }
    });
  },

  graphSubmitHandler: function(index, data) {
    var updated = Update(this.state.data.graph[index], {
      $merge: data
    });
    var graph = this.state.data.graph;
    graph[index] = updated;
    this.setState({
      data: {
        graph: graph
      }
    });
  },

  render: function () {
    var self = this;
    var classes = classNames("collapse-card", {
      "active": this.state.clicked
    });

    var delimiter = {
      label: 'Delimiter',
      submit: true,
      handler: this.delimiterHandler,
      data: this.state.data.delimiter
    };

    var variable_count = {
      label: 'Variable Count',
      submit: true,
      handler: this.varCountHandler,
      data: this.state.data.variable_count
    };

    var graph1 = {
      title: "g",
      xlabel: "x",
      ylabel: "y",
      variable: 0,
      handler: this.graphSubmitHandler
    };

    var graph_nodes = this.state.data.graph.map(function(data, i) {
      var handler = self.graphSubmitHandler.bind(self, i);
      return (
        <GraphForm {...data} handler={handler} />
      );
    })

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
          <SmallForm {...variable_count} ref='f2'/>
          <div className="row">
            <div className="col-md-offset-3">
              <a onClick={this.addGraphHandler} className="btn btn-primary btn-raised">
                Add Graph
              </a>
            </div>
          </div>
          {graph_nodes}
        </div>
      </div>
    );
  },
});

module.exports = Serial;

