const path = require('path');
const express = require('express');
const viewRouter = require('../routes/viewRoutes');

const app = express();

// Making pug work
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

// Serving static files
app.use(express.static(path.join(__dirname, '../public')));

// Routing
app.use('/', viewRouter);
//
module.exports = app;
