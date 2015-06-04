var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var classNames = require('classnames');
var SmallForm = require('./small_form.jsx');
// /var GraphForm = require('./graph_form.jsx');
var Update = require('react/addons').addons.update;
var Marty = require("marty");
var Immutable = require('immutable');
var GraphStore = require('../stores/graphStore');
var GraphActionCreators = require('../actions/graphActionCreators');
/*var Graph = React.createClass({
  //mixins: [
  //  Reflux.listenTo(SerialStore, 'onStoreUpdate')
  //],

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
    Actions.graphUpdate(this.state);
  },

  clickHandler: function(e) {
    this.setState({
      clicked: !this.state.clicked
    });
    Actions.graphUpdate(this.state);
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
    Actions.graphUpdate(this.state);
  },

  delimiterHandler: function() {
    var updated_data = Update(this.state.data, {
      delimiter: {
        $set: this.refs.f1.getValue()
      }
    });

    this.setState({
      data: updated_data
    });
    Actions.graphUpdate(this.state);
  },

  varCountHandler: function() {
    this.setState({
      data: {
        variable_count: this.refs.f2.getValue()
      }
    });
    Actions.graphUpdate(this.state);
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
    Actions.graphUpdate(this.state);
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

module.exports = Graph;*/

var Graph = React.createClass({
  getInitialState: function() {
    return {
      data: Immutable.Map({
        delimiter: null,
        sampleLine: null,
        clicked: false
      })
    };
  },

  clickHandler: function(e) {
    this.setState(function(prev) {
      return {
        data: prev.data.set('clicked', !prev.data.get('clicked'))
      }
    })
  },

  onChange: function(event) {
    var name = event.target.id;
    var value = event.target.value;
    this.setState(function(prev) {
      return {
        data: prev.data.set(name, value)
      };
    });
  },

  submit: function(event) {
    event.preventDefault();
    this.state.data = this.state.data.set('delimiter',
        this.state.data.get('delimiter') || this.props.config.get('delimiter'));
    this.state.data = this.state.data.set('sampleLine',
      this.state.data.get('sampleLine') || this.props.config.get('sampleLine'));

    if((this.state.data.get('delimiter') != null) && (this.state.data.get('sampleLine') != null)) {
      this.state.data = this.state.data.set('clicked', false);
      GraphActionCreators.for(this).updateConfig(this.state.data);
      // Need to call Socket function
    }
    else {
      // Display error message
    }
  },

  convertToString: function(str) {
    var name;
    var re = /^ *$/;

    if(re.exec() !== null) {
      // contains only spaces
      for(var i=0; i<length(str); i++)
        name += 'space ';
      return name;
    }
    if(str[0] == ' ') {
      name = 'space ';

      if(str.length > 1)
        name += str.slice(1);
    }
    else
      name = str;

    return name;
  },

  render: function() {
    var delimiter = this.state.data.get('delimiter') || this.props.config.get('delimiter');
    var sampleLine = this.state.data.get('sampleLine') || this.props.config.get('sampleLine');
    var classes = classNames('collapse-card', {
      'active': this.state.data.get('clicked')
    });

    var name = "Graph Settings";
    var set_delimiter = this.props.config.get('delimiter');
    if((set_delimiter !== null) && (set_delimiter.length > 0)) {
      name+= 'Delimiter: ' + this.convertToString(set_delimiter);
      if(this.props.config.get('sampleLine') !== null)
        name += '    Variable Count: ' + this.props.config.get('sampleLine')
          .split(set_delimiter).filter(Boolean).length;
    }

    return (
      <div className={classes}>
        <div className="collapse-card__heading" onClick={this.clickHandler}>
          <h4 className="collapse-card__title">
            <i className="fa fa-bar-chart"></i>
            {name}
          </h4>
        </div>
        <div className="collapse-card__body">
          <form className="form-horizontal">
            <div className="form-group">
              <label htmlFor="delimiter" className="col-lg-2 control-label">Delimiter</label>
              <div className="col-lg-10">
                <input type="text" className="form-control" id="delimiter" onChange={this.onChange}
                  placeholder={delimiter ? delimiter : 'Delimiter'}></input>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="sampleLine" className="col-lg-2 control-label">Sample Line</label>
              <div className="col-lg-10">
                <input type="text" className="form-control" id="sampleLine" onChange={this.onChange}
                  placeholder={sampleLine ? sampleLine : 'Ex: Var1:delim:Var2:delim:Var3'}></input>
              </div>
            </div>
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

module.exports = Marty.createContainer(Graph, {
  listenTo: GraphStore,
  fetch: {
    config() {
      return GraphStore.for(this).getConfig();
    }
  }
});
