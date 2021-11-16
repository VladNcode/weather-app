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
  const url = `http://api.weatherapi.com/v1/forecast.json?key=${process.env.NEW_API_KEY}&q=${lat},${lon}&days=1&aqi=no&alerts=no`;

  request({ url, json: true }, (error, { body }) => {
    if (error) return callback('Unable to connect to weatherapi services');
    if (body.error) return callback(error.message);

    data = {
      msg: `${body.current.condition.text}. It is currently ${body.current.temp_c} degrees out. It feels like ${body.current.feelslike_c} degrees out.`,
      icon: body.current.condition.icon,
    };

    callback(undefined, data);
  });
};

module.exports = { geocode, forecast };
