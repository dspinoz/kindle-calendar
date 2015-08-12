var request = require('request');

var root = '/api/v1';

module.exports = function(app) {

  // REST API v1.0 ===========================================
  
  app.get(root + '/time', function(req, res) {
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({time: new Date().getTime() }));
  });
  
  app.get(root + '/weather', function(req, res) {
    req.pipe(request('http://rss.weatherzone.com.au/?u=12994-1285&lt=aploc&lc=12495&obs=1&fc=1&warn=0')).pipe(res);
  });
  
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
