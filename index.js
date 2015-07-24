#!/usr/bin/env node


// modules =============================================================
var express = require('express');
var request = require('request');
var app     = express();

// configuration =======================================================
  
var config = require('./config/kindle-calendar');
var routes = require('./app/kindle-calendar');

app.configure(function() {
  
  // the order of app middleware is important - invoked sequentially!
  app.use(express.logger('dev')); // log every request to the console
  
  app.use(express.static(__dirname + '/public')); 	// set the static files location
  //app.use(express.logger('dev')); 				// log only non-public content
  //app.use(express.errorHandler());
});

routes(app);

console.log("Starting kindle-calendar");
exports = module.exports = app; 						   // expose app

// start app ===========================================================

app.listen(config.port, function() { // startup our app at http://localhost:port
  console.log("listening on " + config.port + "...");
});

// signal handling =====================================================

process.on('SIGINT', function() {
  process.exit(0);
});

process.on('exit', function(code) {
	console.log("Server shut down");
});
