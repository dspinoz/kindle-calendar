
var dayNameShortFormat = d3.time.format('%a'),
	monthYearFormat = d3.time.format('%B %Y');

var calendar = new calendarSvg('#month-view');

function update() {
  
  var date = new Date();
  
  calendar.data(date);
  
  d3.select('#date').text(function() {
	 return monthYearFormat(date); 
  });
  
  
  d3.json('/api/v1/weather', function(json) {

    var data = { icon: json.weather[0].icon,
                 title: 'Now',
                 alt: json.weather[0].main,
                 temp: {
                   now: json.main.temp.toFixed(0),
                   min: json.main.temp_min.toFixed(0),
                   max: json.main.temp_max.toFixed(0)
                 }
                };
    
    var weather = d3.select('#weather-now');
    
    weather.html('<div class="weather-h4">' +
                   '<h4><small>' +data.alt+ '</small></h4>' +
                   '<h4><span class="wi '+openWeatherMap_WI(data.icon)+ '"></span></h4>' +
                   '<h4><small>'+data.temp.min+'</small>' +data.temp.now+ '<small>' +data.temp.max+ '</small></h4>' +
                 '</div>');
    
  });


  d3.json('/api/v1/forecast', function(json) {

    var data = [];

    for(var i = 1; i < json.list.length; i++) {
     
     var d = json.list[i];
     
     data.push({icon: d.weather[0].icon,
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
    
    div.append('h6').attr('class', function(d) {
      return 'wi ' + openWeatherMap_WI(d.icon);
    });
    
    div.append('h6').html(function(d) {
      return d.temp.max;
    });
  });
}

update();
setInterval(update, 60000);
