
var ymdFormat = d3.time.format('%Y-%m-%d'),
    dFormat = d3.time.format('%e'),
    tFormat = d3.time.format('%H:%M'),
    monthFormat = d3.time.format('%b'),
    dNameFormat = d3.time.format('%a'),
    dNumFormat = d3.time.format('%w');

var chart = new d3Kit.Skeleton('.view')
  .autoResize('both')
  .on('resize', function() {
    var width = chart.getInnerWidth();
    var height = chart.getInnerHeight();

    chart.getRootG().attr('transform', 'scale('+width/13/3+')');

//    d3.select('#params').text('new width ' + width/12 +  ' height ' + height);
  })
  .on('data', function(date) {
    
    layers.get('month.date').select('text').text(dNameFormat(date) +' '+ dFormat(date) +' ' +monthFormat(date));
    layers.get('time').select('text').text(tFormat(date));
    
  });
  
var layers = chart.getLayerOrganizer();
layers.create([{'month': ['icon', 'date']}, 'day', 'cal', 'time']);
  /*
// setup the svg
layers.get('month.icon').append("text")
  .attr('y', 12)
  .attr("font-family","FontAwesome")
  .text('\uf133');  //calendar
 */ 
layers.get('month.date').append('text')
  .attr('x', 24)
  .attr('y', 8)
  .attr('font-size', '9px')
  .attr('text-anchor', 'middle')
  .attr('font-weight', 'bold')
  .text('');

layers.get('time').append('text')
  .attr('x', 16)
  .attr('y', 20.5)
  .attr('font-size', '9px')
  .attr('text-anchor', 'middle')
  .text('');

var today = ymdFormat.parse('2015-02-25');

var cg = layers.get('cal')
  .attr('transform', ' translate(32,12)')
  .selectAll('g')
  .data(function() {
    var start = d3.time.sunday.floor(today);
    
    while (today.getMonth() == start.getMonth() && 
           start.getDate() != 0) {
      start = d3.time.sunday.floor(new Date(start.getTime() - (24*60*60*1000)));
    }
    
    var end = d3.time.sunday.ceil(new Date(today.getFullYear(), today.getMonth()+1, 0));
    
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
  }).enter()
  .append('g')
    .attr('transform', function(d,i) {
      return 'translate(0, ' + i *2.2 + ')';
    });

var c = cg.selectAll('circle.cal')
  .data(function(d) { return d; })
  .enter()
  .append('circle')
    .classed('cal', true)
    .classed('current', function(d) {
      if (ymdFormat(today) == ymdFormat(d)) {
        return true;
      }
      return false;
    })
    .classed('in-month', function(d) {
      if (monthFormat(today) == monthFormat(d)) {
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

cg.selectAll('text.cal')
  .data(function(d) { return d; })
  .enter()
  .append('text')
    .classed('cal', true)
    .classed('current', function(d) {
      if (ymdFormat(today) == ymdFormat(d)) {
        return true;
      }
      return false;
    })
    .classed('in-month', function(d) {
      if (monthFormat(today) == monthFormat(d)) {
        return true;
      }
      return false;
    })
    .attr('x', function(d,i) { return i*2.2; })
    .attr('y', 0.4)
    .attr('font-size', '1px')
    .attr('text-anchor', 'middle')
    .text(function(d) {
      return dFormat(d);
    });

  
chart.data(today);

var i = 1;
setInterval(function() {
  chart.data(new Date(today.getTime()+(i++*6*60*1000)));
}, 200);
