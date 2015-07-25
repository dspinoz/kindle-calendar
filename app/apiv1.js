
var root = '/api/v1';

module.exports = function(app) {

  // REST API v1.0 ===========================================
  
  app.get(root + '/time', function(req, res) {
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({time: new Date().getTime() }));
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
