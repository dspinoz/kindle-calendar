var request = require('request');
var d3 = require('d3');

var config = require('../config/apiv1');
var timeFormat = d3.time.format('%I:%M %p');

var root = '/api/v1';

module.exports = function(app) {

  // REST API v1.0 ===========================================
  
  app.get(root + '/time', function(req, res) {
    res.set('Content-Type', 'application/json');
    var d = new Date();
    res.send(JSON.stringify({epoch: d.getTime(), zone: 'Australia/Adelaide', time: timeFormat(d)}));
  });
  
  
  app.get(root + '/forecast', function(req, res) {
    req.pipe(request('http://api.openweathermap.org/data/2.5/forecast/daily?q=Adelaide,AU&units=metric&cnt=5&APPID=' + config.openweathermap.APPID)).pipe(res);
  });
  /*
  app.get(root + '/forecast', function(req, res) {
    res.sendfile('public/json/forecast_adelaide.json');
  });
  */
  
  app.get(root + '/weather', function(req, res) {
    req.pipe(request('http://api.openweathermap.org/data/2.5/weather?q=Adelaide,AU&units=metric&APPID=' + config.openweathermap.APPID)).pipe(res);
  });
  /*
  app.get(root + '/weather', function(req, res) {
    res.sendfile('public/json/weather_adelaide.json');
  });
  */
  
  app.get(root + '/hello', function(req,res) {
    res.send('HELLO WORLD');
  });
  
  app.get(root + '/hello/:id/:name', function(req,res) {
    res.send('HELLO '+ req.params.name + ' ('+req.params.id+')');
  });
  
  app.delete(root+'/hello/:id', function(req,res) {
    res.send('GOODBYE ' + req.params.id);
  });
};
