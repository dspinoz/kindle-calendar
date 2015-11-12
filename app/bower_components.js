module.exports = function(app) {

  // TODO load minified in production environment

  app.get('/jquery.js', function(req,res) {
    res.sendfile('bower_components/jquery/dist/jquery.js');
  });

  app.get('/bootstrap.js', function(req,res) {
    res.sendfile('bower_components/bootstrap/dist/js/bootstrap.js');
  });

  app.get('/bootstrap.css', function(req,res) {
    res.sendfile('bower_components/bootstrap/dist/css/bootstrap.css');
  });

  app.get('/bootstrap.css.map', function(req,res) {
    res.sendfile('bower_components/bootstrap/dist/css/bootstrap.css.map');
  });

  app.get('/fonts/glyphicons-halflings-regular.svg', function(req,res) {
    res.sendfile('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg');
  });

  app.get('/fonts/glyphicons-halflings-regular.ttf', function(req,res) {
    res.sendfile('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf');
  });

  app.get('/fonts/glyphicons-halflings-regular.woff', function(req,res) {
    res.sendfile('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff');
  });

  app.get('/font-awesome.css', function(req,res) {
    res.sendfile('bower_components/fontawesome/css/font-awesome.css');
  });

  app.get('/fonts/fontawesome-webfont.woff', function(req,res) {
    res.sendfile('bower_components/fontawesome/fonts/fontawesome-webfont.woff');
  });

  app.get('/fonts/fontawesome-webfont.woff2', function(req,res) {
    res.sendfile('bower_components/fontawesome/fonts/fontawesome-webfont.woff2');
  });

  app.get('/fonts/fontawesome-webfont.ttf', function(req,res) {
    res.sendfile('bower_components/fontawesome/fonts/fontawesome-webfont.ttf');
  });
  
  app.get('/fonts/fontawesome-webfont.eot', function(req,res) {
    res.sendfile('bower_components/fontawesome/fonts/fontawesome-webfont.eot');
  });
  
  app.get('/fonts/fontawesome-webfont.svg', function(req,res) {
    res.sendfile('bower_components/fontawesome/fonts/fontawesome-webfont.svg');
  });
  
  app.get('/weather-icons.css', function(req,res) {
    res.sendfile('bower_components/weather-icons/css/weather-icons.css');
  });
  
  app.get('/font/weathericons-regular-webfont.woff', function(req,res) {
    res.sendfile('bower_components/weather-icons/font/weathericons-regular-webfont.woff');
  });
  
  app.get('/font/weathericons-regular-webfont.woff2', function(req,res) {
    res.sendfile('bower_components/weather-icons/font/weathericons-regular-webfont.woff2');
  });
  
  app.get('/font/weathericons-regular-webfont.eot', function(req,res) {
    res.sendfile('bower_components/weather-icons/font/weathericons-regular-webfont.eot');
  });
  
  app.get('/font/weathericons-regular-webfont.svg', function(req,res) {
    res.sendfile('bower_components/weather-icons/font/weathericons-regular-webfont.svg');
  });
  
  app.get('/font/weathericons-regular-webfont.ttf', function(req,res) {
    res.sendfile('bower_components/weather-icons/font/weathericons-regular-webfont.ttf');
  });

  app.get('/queue.js', function(req, res) {
    res.sendfile('bower_components/queue-async/queue.js');
  });

  app.get('/d3.js', function(req, res) {
    res.sendfile('bower_components/d3/d3.js');
  });
  
  app.get('/d3kit.js', function(req, res) {
	res.sendfile('bower_components/d3kit/dist/d3kit.js');
  });
  
  app.get('/moment.js', function(req,res) {
	 res.sendfile('bower_components/moment/moment.js'); 
  });
  
  app.get('/moment-timezone.js', function(req,res) {
	 res.sendfile('bower_components/moment-timezone//builds/moment-timezone-with-data.js'); 
  });
};
