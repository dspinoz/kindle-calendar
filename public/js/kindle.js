/*
var time_div = d3.select('#time');

function update() {
  
  d3.json('/api/v1/time', function(err,json) {
    
    var d = new Date(json.time);
    
    var hrmin = d3.time.format('%I:%M');
    var day = d3.time.format('%A');
    var month = d3.time.format('%B');
    var daynum = d3.time.format('%e');
    
    time_div.html(function() {
      return '<span class="h1 daynum">' + hrmin(d) + '</span>' +
             '<br/>' +
              '<span class="h1 daynum">' + daynum(d) + '</span>' + '&nbsp;' +
             '<span class="h3 month">' + month(d) + '</span>' +
             '</br>' +
             '<span class="h5 day">' + day(d) + '</span>';
    });
    
  });
}

setInterval(update, 10000);
update();
*/

/*
var MIN_RADIUS = 20;
var MAX_RADIUS = 50;

var DEFAULT_OPTIONS = {
  margin: {top: MAX_RADIUS, right: MAX_RADIUS, bottom: MAX_RADIUS, left: MAX_RADIUS}
};

var xScale = d3.scale.linear();
var yScale = d3.scale.linear();
var radiusScale = d3.scale.linear()
  .range([MIN_RADIUS, MAX_RADIUS]);
var colorScale = d3.scale.category20();

var data = d3.range(20).map(function(i) {
  return {size: i, x: Math.random(), y: Math.random()};
});

// create and configure the charlets

var circles = CircleChartlet()
  .property('radius', function(d, i) {return radiusScale(d.size);})
  .property('color', function(d, i) {return d.customColor || colorScale(i);})
  .on('circleClicked', onClicked);
  
var rects = RectChartlet()
  .property('width', function(d, i) {return radiusScale(d.size);})
  .property('height', function(d, i) {return radiusScale(d.size);})
  .property('color', function(d, i) {return d.customColor || colorScale(i);})
  .on('rectClicked', onClicked);

// create chart

var chart = new d3Kit.Skeleton('.view', DEFAULT_OPTIONS)
  .autoResize('both')
  .on('resize', onResize)
  .on('data', onData);

chart.resizeToFitContainer();
chart.data(data);

// cope with data change

function onData(data) {

  if (chart.hasData()) {

    radiusScale.domain(d3.extent(data, function(d) {return d.size;}));

    var nodes = chart.getRootG().selectAll('g.node')
      .data(data);

    nodes.enter()
      .append('g')
      .classed('node', true)
      .call(circles.enter);

    nodes.exit()
      .call(circles.exit);

    onResize();
  }
}

// handle resize

function onResize() {
  xScale.range([0, chart.getInnerWidth ()]);
  yScale.range([0, chart.getInnerHeight()]);

  chart.getRootG().selectAll('.node')
    .attr('transform', function(d) {return 'translate(' + [xScale(d.x), yScale(d.y)] + ')';})
    .call(circles.update);
}

// toggle circles back when clicked

function onClicked(d) {
  d.customColor = d.customColor ? null : 'black';
  chart.getRootG().selectAll('.node').call(circles.update);
}

// circle chartlet constructor

function CircleChartlet() {

  var events = ['circleClicked'];

  var chartlet = d3Kit.Chartlet(enter, update, exit, events);

  function enter(selection, done) {
    selection
      .append('circle')
      .attr('r', 0)
      .attr('fill', 'white')
      .on('click', chartlet.getDispatcher().circleClicked);

    done(selection);
  }

  function update(selection, done) {
    selection.select('circle')
      .transition()
      .attr('fill', chartlet.property('color'))
      .attr('r', chartlet.property('radius'))
      .each('end', done);
  }

  function exit(selection, done) {
    selection.select('circle')
      .transition()
      .attr('r', 0)
      .remove()
      .each('end', done);
  }

  return chartlet;
};

// rect chartlet constructor

function RectChartlet() {

  var events = ['rectClicked'];

  var chartlet = d3Kit.Chartlet(enter, update, exit, events);

  function enter(selection, done) {
    selection
      .append('rect')
      .attr('width', 0)
      .attr('height', 0)
      .attr('fill', 'white')
      .on('click', chartlet.getDispatcher().rectClicked);

    done(selection);
  }

  function update(selection, done) {
    selection.select('rect')
      .transition()
      .attr('fill', chartlet.property('color'))
      .attr('width', chartlet.property('width'))
      .attr('height', chartlet.property('height'))
      .each('end', done);
  }

  function exit(selection, done) {
    selection.select('rect')
      .transition()
      .attr('width', 0)
      .attr('height', 0)
      .remove()
      .each('end', done);
  }

  return chartlet;
};
*/

var DEFAULT_OPTIONS = {
  margin: {top: 0, right: 0, bottom: 0, left: 0}
};

var chart = new d3Kit.Skeleton('.view', DEFAULT_OPTIONS)
  .autoResize('both');

var root = chart.getRootG();
  
var calendar = root.append('g')
  .attr('transform', 'translate(0, 240) scale(20)');
  
calendar
  .append("text")
    .attr("font-family","FontAwesome")
    .text('\uf133'); 
    
calendar
  .append('text')
  .attr('transform', 'translate(1,0.5)')
  .attr('font-size', '10px')
  .text('25');
  
calendar
  .append('text')
  .attr('transform', 'translate(15,-9)')
  .attr('font-size', '2px')
  .text('July');
  
calendar
  .append('text')
  .attr('transform', 'translate(20,-5)')
  .attr('font-size', '2px')
  .attr('text-anchor', 'middle')
  .text('Saturday');

chart.on('resize', function() {
  var width = chart.getInnerWidth();
  var height = chart.getInnerHeight();

  console.log('new width', width, 'height', height);
});

