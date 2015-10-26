// Utilities for openweathermap data
// Uses weather-icons iconset

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
