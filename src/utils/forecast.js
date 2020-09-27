const request = require('request');
const forecast = (lat, long, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=b2aa384e89ca60fd9b6fb4640bd78898&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '&units=m'
  request({ url, json: true}, (error, {body}) => {
    if(error){
      callback('There was an error', undefined);
    }else if (body.error) {
      callback('unabel to find location', undefined);
    } else {
      callback(undefined, body.current.weather_descriptions[0] + ': The temperature is:' + body.current.temperature + ' Feels like:' + body.current.feelslike + 'The humidity is: ' + body.current.humidity);
    }
  })
}

module.exports = forecast;
