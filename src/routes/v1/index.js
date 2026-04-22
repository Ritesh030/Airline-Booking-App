const express = require('express');

const cityRouter = require('./city_router');
const airportRouter = require('./airport_router');
const flightRouter = require('./flight_router');

const v1Routes = express.Router();

v1Routes.use('/city', cityRouter);
v1Routes.use('/airport', airportRouter)
v1Routes.use('/flight', flightRouter)

module.exports = v1Routes