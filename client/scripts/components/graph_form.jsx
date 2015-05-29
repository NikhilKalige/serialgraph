var React = require('react');
var classNames = require('classnames');
var SmallForm = require('./small_form.jsx');
var Marty = require("marty");
var Immutable = require('immutable');
var Button = require('react-bootstrap').Button;
var Chart = require('../utils/utils');
var GraphFormActionCreators = require('../actions/graphFormActionCreators');

var GraphForm = React.createClass({
  getInitialState: function() {
    return {
      data: Immutable.Map({
        clicked: false,
        config: null
      })
    };
  },

  updateState: function(props) {
    var nextProps = props ? props : this.props;
    this.setState(function(prev) {
      return {
        data: prev.data.set('config', nextProps.chartData)
      };
    });
  },

  componentWillMount: function() {
    this.updateState();
  },

  componentWillReceiveProps: function(nextProps) {
    this.updateState(nextProps);
  },

  clickHandler: function() {
    this.setState(function(prev) {
      return {
        data: prev.data.set('clicked', !prev.data.get('clicked'))
      };
    });
  },

  getValue: function() {
    return {
      title: this.refs.f1.getValue(),
      xlabel: this.refs.f2.getValue(),
      ylabel: this.refs.f3.getValue(),
      variable: this.refs.f4.getValue()
    };
  },

  onChange: function(event) {
    var name = event.target.id;
    var value = event.target.value;
    this.setState(function(prev) {
      var config;
      config = prev.data.get('config').set(name, value);
      return {
        data: prev.data.set('config', config)
      };
    });
  },

  onVarChange: function(event) {
    var value = event.target.value;
    this.setState(function(prev) {
      var config, arr;
      if(value == '')
        arr = [];
      else {
        arr = value.split(',').map(function(v) {
          return v.replace(/ /g, '');
        });
      }
      config = prev.data.get('config').set('variables', arr);
      return {
        data: prev.data.set('config', config)
      };
    });
  },

  submit: function(event) {
    event.preventDefault();
    var config, variables;
    config = this.state.data.get('config');
    if((config.get('title') == '') || (config.get('xlabel') == '') || (config.get('ylabel') == ''))
      return;

    variables = config.get('variables');
    if(variables.length == 0)
      return;

    config = config.set('variables', variables);
    GraphFormActionCreators.for(this).updateConfig(this.props.id, config);

    this.setState(function(prev) {
      return {
        data: prev.data.set('clicked', false)
      };
    });
  },

  render: function() {
    var classes = classNames('collapse-card', {
      'active': this.state.data.get('clicked')
    });
    var title = this.state.data.get('config').get('title');
    var xlabel = this.state.data.get('config').get('xlabel');
    var ylabel = this.state.data.get('config').get('ylabel');
    if(this.state.data.get('config').get('variables').length) {
      var variables = this.state.data.get('config').get('variables').join(', ');
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
              <label htmlFor="title" className="col-lg-2 control-label">Delimiter</label>
              <div className="col-lg-10">
                <input type="text" className="form-control" id="title" onChange={this.onChange}
                  placeholder={title ? title : 'Title'}></input>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="xlabel" className="col-lg-2 control-label">X Label</label>
              <div className="col-lg-10">
                <input type="text" className="form-control" id="xlabel" onChange={this.onChange}
                  placeholder={xlabel ? xlabel : 'Xlabel'}></input>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="ylabel" className="col-lg-2 control-label">Y Label</label>
              <div className="col-lg-10">
                <input type="text" className="form-control" id="ylabel" onChange={this.onChange}
                  placeholder={ylabel ? ylabel : 'Ylabel'}></input>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="variables" className="col-lg-2 control-label">Variables</label>
              <div className="col-lg-10">
                <input type="text" className="form-control" id="variables" onChange={this.onVarChange}
                  placeholder={variables ? variables : 'Var1, Var2'}></input>
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
/*var GraphForm = React.createClass({
  getValue: function() {
    return {
      title: this.refs.f1.getValue(),
      xlabel: this.refs.f2.getValue(),
      ylabel: this.refs.f3.getValue(),
      variable: this.refs.f4.getValue()
    };
  },

  submitHandler: function(event) {
    this.props.handler(this.getValue());
  },

  render: function() {
    var title = {
      label: 'Graph Title',
      submit: false,
      data: this.props.title
    };

    var xlabel = {
      label: 'X Label',
      submit: false,
      data: this.props.xlabel
    };

    var ylabel = {
      label: 'Y Label',
      submit: false,
      data: this.props.ylabel
    };

    var variable = {
      label: 'Variable',
      submit: false,
      data: this.props.variable
    };

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <SmallForm {...title} ref='f1'/>
          <SmallForm {...xlabel} ref='f2'/>
          <SmallForm {...ylabel} ref='f3'/>
          <SmallForm {...variable} ref='f4'/>
          <div className="row">
            <div className="col-md-offset-3">
              <a onClick={this.submitHandler} className="btn btn-primary btn-raised">
                Submit
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});*/

module.exports = GraphForm;
