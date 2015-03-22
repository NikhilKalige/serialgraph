var React = require('react');

var Graph = require("./graph.jsx");
var Console = require("./console.jsx");
var Serial = require("./serial.jsx");
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;

var App = React.createClass({
    render: function() {
        return (
            <div className="container">
                <Row className="text-center">
                    <Col md={4}>
                        <Graph/>
                    </Col>
                    <Col md={4}>
                        <Serial/>
                    </Col>
                    <Col md={4}>
                        <Console/>
                    </Col>
                </Row>
            </div>
        );
    }
});

 module.exports = App;
