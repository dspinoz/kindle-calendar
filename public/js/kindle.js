

var timeFormat = d3.time.format('%-I:%M %p'),
    monthFormat = d3.time.format('%B'),
    dayNumFormat = d3.time.format('%e'),
    dayNameFormat = d3.time.format('%A'),
    dayNameShortFormat = d3.time.format('%a'),
    yearFormat = d3.time.format('%Y'),
    sunTimeFormat = d3.time.format('%c');

var calendarChart = d3Kit.factory.createChart(
  {
    margin: {top: 0, right: 0, bottom: 0, left: 0}
  }, 
  [],
  function(skel) {
    
    skel.mixin({
      'dayhover': function(d,i) {
      },
      'ymdFormat': d3.time.format('%Y-%m-%d'),
      'monthFormat': d3.time.format('%B'),
      'dayNumFormat': d3.time.format('%e')
    });
    
    var resize = function(dim) {
      redraw(skel.data());
    };
    
    var redraw = function() {
    
      if (!skel.hasData()) {
        return;
      }
      
      var date = skel.data();
      
      var x = skel.getInnerWidth()/7;
      var y = x;
      var r = x/2;

      var g = skel.getRootG().selectAll('g')
        .data(function() {
          var start = d3.time.sunday.floor(date);
          
          while (date.getMonth() == start.getMonth() && 
                 start.getDate() != 0) {
            start = d3.time.sunday.floor(new Date(start.getTime() - (24*60*60*1000)));
          }
          
          var end = d3.time.sunday.ceil(new Date(date.getFullYear(), date.getMonth()+1, 0));
          
          var days = d3.time.days(start, end);

          while (days.length < 42) {
            end = d3.time.sunday.ceil(new Date(end.getTime() + (24*60*60*1000)));
            days = d3.time.days(start, end);
          }
              
          return [days.slice(0, 7),
              days.slice(7, 14),
              days.slice(14, 21),
              days.slice(21, 28),
              days.slice(28, 35),
              days.slice(35, 42)];
        });
        
      g.exit().remove();
      
      g.enter()
        .append('g');
      
      g.attr('transform', function(d,i) {
        return 'translate('+r+', ' + i*y + ')';
      });

      var c = g.selectAll('circle.cal')
        .data(function(d) { return d; });
        
      c.exit().remove();
       
      c.enter()
          .append('circle')
          .classed('cal', true);
          
      c.classed('current', function(d) {
        if (skel.ymdFormat(date) == skel.ymdFormat(d)) {
          return true;
        }
        return false;
      })
      .classed('in-month', function(d) {
        if (skel.monthFormat(date) == skel.monthFormat(d)) {
          return true;
        }
        return false;
      })
      .attr('cx', function(d,i) { return i*x; })
      .attr('cy', r)
      .attr('r', r)
      .on('mouseover', function(d,i) {
        skel.dayhover(d,i);
      });

      var txt = g.selectAll('text.cal').data(function(d) { return d; });
      
      txt.exit().remove();
      
      txt.enter()
        .append('text')
        .classed('cal', true);
            
      txt.classed('current', function(d) {
        if (skel.ymdFormat(date) == skel.ymdFormat(d)) {
          return true;
        }
        return false;
      })
      .classed('in-month', function(d) {
        if (skel.monthFormat(date) == skel.monthFormat(d)) {
          return true;
        }
        return false;
      })
      .attr('x', function(d,i) { return i*x; })
      .attr('y', r+(r*0.3)) //get text into the centre of the circle
      .attr('font-size', r)
      .attr('text-anchor', 'middle')
      .text(function(d) {
        return skel.dayNumFormat(d);
      });
    };

    skel
      .autoResize('width')
      .on('resize', resize)
      .on('data', redraw);
  });

var textSvg = d3Kit.factory.createChart(
  {
    margin: {top: 0, right: 0, bottom: 0, left: 0},
    initialWidth: 0,
    initialHeight: 0
  }, 
  [],
  function(skel) {
  
    var pt = 1;
  
    skel.mixin({
      'text': function(d) {
        return d;
      }
    });
    
    var resize = function(dim) {
      redraw(skel.data());
    };
    
    var redraw = function() {
      var data = skel.data();
      
      if (!skel.hasData()) {
        return;
      }

      var dispatch = skel.getDispatcher();
      
      var txt = skel.getRootG()
        .selectAll('text')
        .data([data]);
      
      txt.exit().remove();
      
      txt.enter()
        .append('text')
          .style('font-size', pt);
        
      txt.text(skel.text);
        
        
      //var div = d3.select('#time').node().getBoundingClientRect();
      var div = {width: skel.getInnerWidth(), height: skel.getInnerHeight()};
      var svg = txt.node().getBBox();

      // see how big the text can grow
      var checkedMax = false;
      while(svg.width < div.width) {
        checkedMax = true;
        txt.style('font-size', pt++)
           .attr('y', pt-(pt*.25)); // take some for hanging chars
        svg = txt.node().getBBox(); 
      }
      
      // found the max
      if (checkedMax) {
        pt--;
      }
      
      // text is too big, make it fit
      var checkedMin = false;
      while(svg.width > div.width) {
        checkedMin = true;
        txt.style('font-size', pt--)
           .attr('y', pt-(pt*.25)); // take some for hanging chars
        svg = txt.node().getBBox(); 
      }
      
      // found the min
      if (checkedMin) {
        pt++;
      }
      
      skel.height(svg.height, true);
      
      txt.style('font-size', pt)
         .attr('y', pt-(pt*.25)); // take some for hanging chars
    };

    skel
      .autoResize('both')
      .on('resize', resize)
      .on('data', redraw);
  });

  
var calendar = new calendarChart('#month-view');
  
var time = new textSvg('#time').mixin({
  'text': function(d) {return timeFormat(d);}
});

var day = new textSvg('#day').mixin({
  'text': function(d) {return dayNameFormat(d);}
});

var dateLong = new textSvg('#date').mixin({
  'text': function(d) {
    return dayNumFormat(d)+' '+monthFormat(d);}
});


function updateDate() {
  
  var date = new Date();
  
  time.data(date);
  day.data(date);
  dateLong.data(date);
  
  calendar.data(date);
  
  d3.select('#footer').html('<span class="fa fa-refresh"></span> Last refreshed at ' + d3.time.format.iso(new Date()));
}

updateDate();
setInterval(updateDate, 60000);

function openWeatherMap_WI(owm_icon_name) {

  //http://openweathermap.org/weather-conditions
  var wi = '';
  
  var type = +owm_icon_name.slice(0,2);
  var time = '';
  
  if (owm_icon_name.slice(2,3) == 'd') {
    time = 'day';
  }
  else if (owm_icon_name.slice(2,3) == 'n') {
    time = 'night-alt';
  }
  
  switch(type) {
    case 01:
      if (time == 'day') {
        wi = 'sunny';
      } else {
        time = 'night';
        wi = 'clear';
      }
      break;
    case 02:
      wi = 'cloudy';
      break;
    case 03:
    case 04:
      wi = 'cloudy';
      time = '';
      break;
    case 09:
      wi = 'showers';
      break;
    case 10:
      wi = 'rain';
      break;
    case 11:
      wi = 'thunderstorm';
      break;
    case 13:
      wi = 'snow';
      break;
    case 50:
      wi = 'fog';
      break;
    default:
      wi = 'alien';
  }
  
  return 'wi'+(time.length > 0 ? '-'+time : '')+'-'+wi;
}

function getWeatherData() {
  var q = queue(1);
  
  var getJson = function(path, callback) {
    d3.json('/api/v1/'+path, function(err,json) {
      callback(err,{name: path, json: json});
    });
  };
  
  q.defer(getJson, 'weather')
    .defer(getJson, 'forecast')
    .awaitAll(function(err,results) {
      console.log('queue results', err,results);
      
      //combine weather and forecast in order to show concise weather info
      var data = [];
      
      results.filter(function(r) {
        if (r.name == 'weather') {
          return true;
        }
        return false;
      }).forEach(function(r) {
        console.log('w', r);
        data.push({icon: r.json.weather[0].icon,
                   title: 'Now',
                   alt: r.json.weather[0].main,
                   temp: {
                     now: r.json.main.temp.toFixed(0),
                     min: r.json.main.temp_min.toFixed(0),
                     max: r.json.main.temp_max.toFixed(0)
                   }
                 });
      });
      
      results.filter(function(r) {
        if (r.name == 'forecast') {
          return true;
        }
        return false;
      }).forEach(function(r) {
        
        console.log('f', r);
        
        for(var i = 1; i < r.json.list.length; i++) {
          
          var d = r.json.list[i];
          
          console.log('d', d, data);
          
          data.push({icon: d.weather[0].icon,
                     title: dayNameShortFormat(new Date(d.dt*1000)),
                     alt: d.weather[0].main,
                     temp: {
                       min: d.temp.min.toFixed(0),
                       max: d.temp.max.toFixed(0)
                     }
                    });
        }
      });
      
      console.log('data', data);
      
      
      var p = d3.select('#forecast').selectAll('div').data(data);
      
      p.exit().remove();
      
      p.enter()
        .append('div');
      
      p.attr('class', 'col-xs-3').style('padding', '0').style('text-align', 'center');
      
      p.html(function(d) {
        
        return '<table class="table-condensed">'+
          '<tr><td class="h4">'+d.title+'<br/><small>'+d.alt+'</small></td></tr>'+
          '<tr><td class="h3"><span class="wi '+openWeatherMap_WI(d.icon)+'"></span></td></tr>'+
          '<tr><td class="h5">'+(d.temp.now ? d.temp.now : d.temp.min+' - '+d.temp.max)+'</td></tr>'+
        '</table>';
      });
      
    });
}

getWeatherData();
