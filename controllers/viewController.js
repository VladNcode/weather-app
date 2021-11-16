const AppError = require('../utils/appError');
// const weather = require('../utils/weather');

exports.getMain = (req, res, next) => {
  res.status(200).render('main', {
    title: 'Main page',
  });
};

exports.getWeather = (req, res, next) => {
  const adress = req.query.adress;
  if (!adress) return next(new AppError('You must provide an address!', 404));

  res.status(200).render('weather', {
    title: 'Weather page',
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
    helpMessage: 'Somebody help me please!',
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
