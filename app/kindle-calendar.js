
var kindle_calendar = require('../config/kindle-calendar');

var bower_resources = require('./bower_components');
var apiv1 = require('./apiv1');

module.exports = function(app) {

  bower_resources(app);
  apiv1(app);

  // pages =============================================================
  // for client-side rendering

  app.get('/', function(req,res) {
	res.send('root');
  });
  
  app.get('/index', function(req,res) {
	res.render('index', kindle_calendar.get(req));
  });
  
  app.get('/new', function(req,res) {
	res.send('new');
  });
  
};
