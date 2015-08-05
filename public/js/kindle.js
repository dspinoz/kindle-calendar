

var ymdFormat = d3.time.format('%Y-%m-%d'),
    timeFormat = d3.time.format('%H:%M'),
    monthFormat = d3.time.format('%B'),
    dayNumFormat = d3.time.format('%e'),
    dayNameFormat = d3.time.format('%A');

var today = ymdFormat.parse('2015-01-09');



var chart = new d3Kit.Skeleton('#month-view')
  .autoResize('both')
  .on('resize', function() {
    var width = chart.getInnerWidth();
    var height = chart.getInnerHeight();
    console.log('month-view ' + width + ' x ' + height);
    
    chart.getRootG().attr('transform', 'translate(12,12) scale(10)');
    
  })
  .on('data', function(date) {
    var g = chart.getRootG()
      .selectAll('g')
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
        return 'translate(0, ' + i *2.2 + ')';
      });

      var c = g.selectAll('circle.cal')
        .data(function(d) { return d; });
        
      c.exit().remove();
       
      c.enter()
          .append('circle');
          
      c.classed('cal', true)
        .classed('current', function(d) {
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
        .attr('cx', function(d,i) { return i*2.2; })
        .attr('cy', 0)
        .attr('r', 1)
        .on('mouseover', function(d) {
          console.log(d);
          d3.select('#circle-data').text(JSON.stringify(d));
        });

        var txt = g.selectAll('text.cal').data(function(d) { return d; });
        
        txt.exit().remove();
        
        txt.enter()
          .append('text');
              
        txt.classed('cal', true)
          .classed('current', function(d) {
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
          .attr('x', function(d,i) { return i*2.2; })
          .attr('y', 0.4)
          .attr('font-size', '1px')
          .attr('text-anchor', 'middle')
          .text(function(d) {
            return dayNumFormat(d);
          });
  });



var count = 1;
setInterval(function() {
  
  var date = new Date(today.getTime()+((count+=50)*6*60*1000));
  
  
  d3.select('#date').html(dayNumFormat(date) +' ' +monthFormat(date) + ' <small>'+dayNameFormat(date)+'</small>');
  d3.select('#time').text(timeFormat(date));
  
  chart.data(date);
  
  d3.select('#footer').html('<span class="fa fa-refresh"></span> Last refreshed at ' + d3.time.format.iso(new Date()));
  
  
}, 100);

