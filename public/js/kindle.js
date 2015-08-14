

var ymdFormat = d3.time.format('%Y-%m-%d'),
    timeFormat = d3.time.format('%-I:%M %p'),
    monthFormat = d3.time.format('%B'),
    dayNumFormat = d3.time.format('%e'),
    dayNameFormat = d3.time.format('%A'),
    yearFormat = d3.time.format('%Y');

var chart = new d3Kit.Skeleton('#month-view', {
    margin: {top: 0, right: 0, bottom: 0, left: 0}
  })
  .autoResize('width')
  .autoResizeToAspectRatio(1);
  
var redraw = function(date) {

  if (Object.prototype.toString.call( date ) !== '[object Date]') {
    // not a date - chart size (from resize)
    return;
  }
  
  if (!chart.hasData()) {
    return;
  }
  
  var x = chart.getInnerWidth()/7;
  var y = chart.getInnerHeight()/7;
  var r = x/2;

  var g = chart.getRootG().selectAll('g')
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
    if (ymdFormat(date) == ymdFormat(d)) {
      return true;
    }
    return false;
  })
  .classed('in-month', function(d) {
    if (monthFormat(date) == monthFormat(d)) {
      return true;
    }
    return false;
  })
  .attr('cx', function(d,i) { return i*x; })
  .attr('cy', r)
  .attr('r', r)
  .on('mouseover', function(d) {
    console.log(d);
    d3.select('#circle-data').text(JSON.stringify(d));
  });

  var txt = g.selectAll('text.cal').data(function(d) { return d; });
  
  txt.exit().remove();
  
  txt.enter()
    .append('text')
    .classed('cal', true);
        
  txt.classed('current', function(d) {
    if (ymdFormat(date) == ymdFormat(d)) {
      return true;
    }
    return false;
  })
  .classed('in-month', function(d) {
    if (monthFormat(date) == monthFormat(d)) {
      return true;
    }
    return false;
  })
  .attr('x', function(d,i) { return i*x; })
  .attr('y', r+(r/4))
  .attr('font-size', r)
  .attr('text-anchor', 'middle')
  .text(function(d) {
    return dayNumFormat(d);
  });
}
  
chart
  .on('resize', redraw)
  .on('data', redraw);
  



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
      
      if (Object.prototype.toString.call( data ) !== '[object Date]') {
        // not a date - chart size (from resize)
        return;
      }
      
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


var time = new textSvg('#time').mixin({
  'text': function(d) {return timeFormat(d);}
});

var year = new textSvg('#year').mixin({
  'text': function(d) {return yearFormat(d);}
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
  year.data(date);
  day.data(date);
  dateLong.data(date);
  
  chart.data(date);
  
  d3.select('#footer').html('<span class="fa fa-refresh"></span> Last refreshed at ' + d3.time.format.iso(new Date()));
}

updateDate();
setInterval(updateDate, 60000);


d3.xml('/api/v1/weather', "application/xml", function(err, xml) {

  console.log('weather', err,xml);
  var rss = xml.getElementsByTagName('rss');
  var channel = rss[0].getElementsByTagName('channel');
  var items = channel[0].getElementsByTagName('item');

  var data = [];
  for(var i = 0; i < items.length; i++) {
    data.push(items[i]);
  }
  
  var p = d3.select('#weather').selectAll('p')
    .data(data.filter(function(d) {
      var str = d.getElementsByTagName('title')[0].childNodes[0].nodeValue;
      if (str.toLowerCase().indexOf('current weather') == -1 &&
          str.toLowerCase().indexOf('weather forecast') == -1) {
        return false;
      }
      return true;
    }));
  
  p.exit().remove();
  
  p.enter().append('p');
  
  p.html(function(d) {
    return d.getElementsByTagName('title')[0].childNodes[0].nodeValue + "<br/>" +
      d.getElementsByTagName('description')[0].childNodes[0].nodeValue;
  });

});