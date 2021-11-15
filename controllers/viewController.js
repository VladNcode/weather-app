exports.getMain = (req, res, next) => {
  res.status(200).render('main', {
    title: 'Main page',
  });
};

exports.getWeather = (req, res, next) => {
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
