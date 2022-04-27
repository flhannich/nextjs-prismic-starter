const axios = require('axios');

exports.handler = (event, context, callback) => {

  const apiKey = process.env.OPENWEATHER_API_KEY;

  const lat = "49.460983"
  const lon = "11.061859"
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  
  axios(
    {
      method: 'get',
      url: url
    }
  ).then(function(response){
    console.log(response);
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(response)
    })
  }).catch(function(error) {
    if (error.response) {
      console.error(error.response);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error(error.message);
    }
    console.error(error.config);
  });
};