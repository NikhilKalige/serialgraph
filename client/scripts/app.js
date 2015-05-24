var React = window.React = require('react');
var mountNode = document.getElementById("app");
var Socket = require('./sources/serialSocket');

Socket.open();

var App = require("./components/main.jsx");
React.render(<App/>, mountNode);
