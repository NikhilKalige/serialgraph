var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions/actions');
var SerialStore = require('../stores/serial');
var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input;
var classNames = require('classnames');

var Serial = React.createClass({
  mixins: [
    Reflux.listenTo(SerialStore, 'onStoreUpdate')
  ],

  getInitialState: function () {
    return {
      clicked: false,
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

  render: function () {
    var classes = classNames(
      "collapse-card",
      {
        "active": this.state.clicked
      }
    );
    return (
      <div className={classes}>
        <div className="collapse-card__heading" onClick={this.clickHandler}>
          <h4 className="collapse-card__title">
            <i className="fa fa-bar-chart"></i>
            Graph settings
          </h4>
        </div>
        <div className="collapse-card__body">
          <div className="row">
            <div className="form-horizontal">
              <div className="form-group">
                <label for="inputEmail" className="col-md-offset-1 col-lg-2 input-lg control-label">Email</label>
                <div className="form-group form-control-wrapper col-md-offset-3 col-md-5">
                  <input className="form-control input-lg" type="text"></input>
                  <span className="gsubmit form-control-feedback">
                    <i className="fa fa-2x fa-arrow-right"></i>
                  </span>
                  <div className="hint">You should really write something here</div>
                </div>
              </div>
            </div>
          </div>

          <form className="form-horizontal">
            <div className="form-group">
              <label for="inputEmail" className="col-lg-2 control-label">Email</label>
              <div className="col-lg-10">
                <input className="form-control" id="inputEmail"
                  placeholder="Email" type="email"></input>
              </div>
            </div>

          <div className="form-group">
            <input className="form-control floating-label" id="focusedInput"
              placeholder="Focus to show the hint"
              data-hint="You should really write something here" type="text">
            </input>
          </div>

            <div className="form-group">
              <label className="control-label">Input addons</label>
              <div className="input-group">
                <span className="input-group-addon">$</span>
                <input className="form-control" type="text"></input>
                <span className="form-control-feedback">
                  <i className="fa fa-arrow-right"></i>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  },
});

module.exports = Serial;

