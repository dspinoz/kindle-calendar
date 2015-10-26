// Chart for automatically rendering a calendar
// eg.
//   var calendar = new calendarSvg('#month-view');
//   calendar.data(new Date());

var calendarSvg = d3Kit.factory.createChart(
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
  
