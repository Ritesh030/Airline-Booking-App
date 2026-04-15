const express = require('express');

const cityRouter = require('./city_router');
const airportRouter = require('./airport_router');

const v1Routes = express.Router();

v1Routes.use('/city', cityRouter);
v1Routes.use('/airport', airportRouter)

module.exports = v1Routes