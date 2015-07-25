
var kindle_calendar = require('../config/kindle-calendar');

var bower_resources = require('./bower_components');
var apiv1 = require('./apiv1');

module.exports = function(app) {

  bower_resources(app);
  apiv1(app);

  // configure templates
  app.locals.title = 'Kindle Calendar';
  app.locals.pages = [
    {href: '/aaa', title: 'Aaa'}   
  ];

  // pages =============================================================
  // for client-side rendering

  app.get('/', function(req,res) {
	res.render('index', req);
  });
  
  app.get('/index.html', function(req,res) {
	res.render('index', req);
  });
  
};
