const AppError = require('../utils/appError');
const { geocode, forecast } = require('../utils/weather');

exports.getMain = (req, res, next) => {
  res.status(200).render('main', {
    title: 'Main page',
  });
};

exports.getApi = (req, res, next) => {
  const adress = req.query.adress;
  if (!adress) return next(new AppError('You must provide an address!', 404));

  geocode(adress, (err, { lat, lon, loc } = {}) => {
    if (err)
      return next(
        new AppError(
          `Error: Unable to find: "${adress}". Try another search!`,
          404
        )
      );

    forecast(lat, lon, (err, forecastData) => {
      if (err) return next(new AppError(`Error: ${err}`, 404));

      res.status(200).json({
        title: 'API page',
        icon: `https://${forecastData.icon.slice(2)}`,
        location: loc,
        data: forecastData.msg,
        time: forecastData.time,
      });
    });
  });
};

exports.getWeather = (req, res, next) => {
  const adress = req.query.adress;
  if (!adress) return next(new AppError('You must provide an address!', 404));

  geocode(adress, (err, { lat, lon, loc } = {}) => {
    if (err)
      return next(
        new AppError(
          `Error: Unable to find: "${adress}". Try another search!`,
          404
        )
      );
    // console.log('Data:', data);

    forecast(lat, lon, (err, forecastData) => {
      if (err) return next(new AppError(`Error: ${err}`, 404));

      res.status(200).render('weather', {
        title: 'Weather page',
        icon: `https://${forecastData.icon.slice(2)}`,
        location: loc,
        data: forecastData.msg,
        time: forecastData.time,
      });
    });
  });
};

exports.getAbout = (req, res, next) => {
  res.status(200).render('about', {
    title: 'About Page',
  });
};

exports.getHelp = (req, res, next) => {
  res.status(200).render('help', {
    title: 'Help Page',
    helpMessage: 'Help message placeholder',
  });
};

exports.getProducts = (req, res, next) => {
  const data = req.query.search;
  if (!data) return next(new AppError('You must provide a search term', 404));

  res.status(200).json({
    status: 'success',
    data,
  });
};
