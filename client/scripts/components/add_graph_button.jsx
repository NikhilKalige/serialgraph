var React = require('react');
var GraphFormActionCreators = require('../actions/graphFormActionCreators');

module.exports = React.createClass({
    onClick: function() {
        GraphFormActionCreators.for(this).addGraphForm();
    },

    render: function() {
        return (
            <div className='container'>
                <button className="btn btn-primary btn-raised" onClick={this.onClick}>Add Graph</button>
            </div>
        );
    }
});
