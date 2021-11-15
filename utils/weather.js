const request = require('request');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const geocode = (adress, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    adress
  )}.json?access_token=${process.env.MAPBOX_API_KEY}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) return callback('Unable to connect to loaction services');
    if (body.features.length === 0)
      return callback('Unable to find location. Try another search.');

    data = {
      lon: body.features[0].center[0],
      lat: body.features[0].center[1],
      loc: body.features[0].place_name,
    };

    callback(undefined, data);
  });
};

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${lat},${lon}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) return callback('Unable to connect to weatherstack services');
    if (body.error) return callback(body.error.info);

    callback(
      undefined,
      `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`

      // `${res.body.location.name}. ${res.body.location.region}. ${res.body.location.country}. ${res.body.current.weather_descriptions[0]}. It is currently ${res.body.current.temperature} degrees out. It feels like ${res.body.current.feelslike} degrees out.`
    );
  });
};

const weather = adress => {
  if (!adress) return console.log('No adress provided!');

  geocode(adress, (err, { lat, lon, loc } = {}) => {
    if (err) return console.log('Error:', err);
    console.log('Data:', data);

    forecast(lat, lon, (err, forecastData) => {
      if (err) return console.log('Error:', err);
      console.log(loc);
      console.log('Data:', forecastData);
    });
  });
};

weather(process.argv[2]);
