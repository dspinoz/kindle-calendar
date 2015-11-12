
var dayNameShortFormat = d3.time.format('%a'),
	monthYearFormat = d3.time.format('%B %Y');

var calendar = new calendarSvg('#month-view');

function update() {
  
  d3.json('/api/v1/time', function(json) {
    var md = moment(json.epoch).tz(json.zone);
    
    var moment_str = md.format('YYYY-MM-DD');
    var parser = d3.time.format('%Y-%m-%d');
    var srv_day = parser.parse(moment_str);
    
    calendar.data(srv_day);
    
    d3.select('#time').text(json.time);
    d3.select('#date').text(monthYearFormat(srv_day));
  });
  
  d3.json('/api/v1/weather', function(json) {

    var data = { time: json.dt,
                 icon: json.weather[0].icon,
                 title: 'Now',
                 alt: json.weather[0].main,
                 humidity: json.main.humidity,
                 pressure: json.main.pressure,
                 temp: json.main.temp.toFixed(0)
                };
    
    var weather = d3.select('#weather-now');
    
    var icon = {alt:data.alt, icon: data.icon};
    
    // shorten the description so it fits in the small space
    var desc = icon.alt;
    var c = icon.alt.match(/(.*?) (clouds|rain)$/);
    if (c != null) {
	  desc = c[2];
	  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
	}
    
    var start = '<div class="weather-h4"><span class="time">' + moment(data.time*1000).tz('Australia/Adelaide').format('HH:MM Z') + '</span>'+
                   '<h4><small>' +desc+ '</small></h4>' +
                   '<h4><span class="wi '+openWeatherMap_WI(icon.icon)+ ' icon-' + icon.alt.replace(' ','-').toLowerCase() + '"></span></h4>';
                   
	var temp = '<h4>' +data.temp+ '</h4>';

	// decide if extra information should be shown - takes up precious screen real-estate!
	var end = //'<h4 class="extra"><span class="wi wi-barometer"></span>' +data.pressure+ 
              //  '<span class="wi wi-humidity"></span>' +data.humidity +
            //'</h4>' +
          '</div>';
    
    
    weather.html(start + temp + end);
    
  });


  d3.json('/api/v1/forecast', function(json) {

    var data = [];

    for(var i = 1; i < json.list.length; i++) {
     
     var d = json.list[i];
     
     data.push({time: d.dt,
                icon: d.weather[0].icon,
                title: dayNameShortFormat(new Date(d.dt*1000)),
                alt: d.weather[0].main,
                temp: {
                  min: d.temp.min.toFixed(0),
                  max: d.temp.max.toFixed(0)
                }
               });
    };
                      
    var forecast = d3.select('#weather-forecast');
    
    forecast.selectAll("*").remove();
    
    var h6 = forecast.selectAll('.weather-h6').data(data);
    
    var div = h6.enter().append('div')
                .classed('weather-h6', true);
                
    div.append('h6')
      .text(function(d) {
        return d.title;
      });
      
    div.append('h6').append('small').text(function(d) {
      return d.alt;
    });
    
    div.append('h6').append('span').attr('class', function(d) {
      return 'wi ' + openWeatherMap_WI(d.icon);
    });
    
    div.append('h6').html(function(d) {
      return d.temp.max;
    });
  });
}

update();
setInterval(update, 60000);
