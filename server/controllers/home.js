var express = require('express'),
  router = express.Router(),
  Article = require('../models/article');

var Serial = require("../serial/main");

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  var articles = [new Article(), new Article()];
    res.render('index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
});

router.get('/serialport', function(req, res, next) {
  //res.json(Serial.list())
});
