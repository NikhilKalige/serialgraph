var React = require('react');
var Button = require('react-bootstrap').Button;

var Graph = React.createClass({
    render: function() {
        return (
            <div>
                <Button bsStyle="primary">Graph Settings</Button>
            </div>
        );
    }
});

module.exports = Graph;
