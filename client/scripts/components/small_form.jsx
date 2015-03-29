var React = require('react');

SmallForm = React.createClass({
  /**
   * label: must
   * submit: true or false
   * error: string
   * handler
   * validation type
   */
  getValue: function() {
    return React.findDOMNode(this.refs.input).value;
  },

  componentDidUpdate: function() {
    React.findDOMNode(this.refs.input).value = '';
  },

  render: function() {
    var submitButton = (
      <span className="gsubmit form-control-feedback" onClick={this.props.handler}>
        <i className="fa fa-2x fa-arrow-right"></i>
      </span>
    );

    var errorMssg = (
      <div className="hint">{this.props.error}</div>
    );

    return (
      <div className="row">
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-offset-1 col-lg-2 input-lg control-label">
              {this.props.label}
            </label>
            <div className="form-group form-control-wrapper col-md-offset-3 col-md-5">
              <input ref="input" className="form-control input-lg" type="text"
                placeholder={this.props.data}>
              </input>
              {this.props.submit ? submitButton : ''}
              {this.props.error ? errorMssg : ''}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SmallForm;
