// Chart for automatically scaling SVG text into the parent container
// eg.
//   var timeFormat = d3.time.format('%-I:%M %p');
//   var time = new textSvg('#time').mixin({
//     'text': function(d) {return timeFormat(d);}
//   });
//   time.data(new Date());

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
