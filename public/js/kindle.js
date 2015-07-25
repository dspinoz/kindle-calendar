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
