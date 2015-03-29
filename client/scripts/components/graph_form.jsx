var React = require('react');
var SmallForm = require('./small_form.jsx');

var GraphForm = React.createClass({
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
});

module.exports = GraphForm;
