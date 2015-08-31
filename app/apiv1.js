var request = require('request');

var root = '/api/v1';

module.exports = function(app) {

  // REST API v1.0 ===========================================
  
  app.get(root + '/time', function(req, res) {
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({time: new Date().getTime() }));
  });
  
  
  app.get(root + '/forecast', function(req, res) {
    req.pipe(request('http://api.openweathermap.org/data/2.5/forecast/daily?q=Adelaide,AU&units=metric&cnt=5')).pipe(res);
  });
  /*
  app.get(root + '/forecast', function(req, res) {
    res.sendfile('public/json/adelaide_forecast.json');
  });
  */
  
  app.get(root + '/weather', function(req, res) {
    req.pipe(request('http://api.openweathermap.org/data/2.5/weather?q=Adelaide,AU&units=metric')).pipe(res);
  });
  /*
  app.get(root + '/weather', function(req, res) {
    res.sendfile('public/json/adelaide.json');
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
