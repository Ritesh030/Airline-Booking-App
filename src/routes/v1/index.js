const express = require('express');
const cityRouter = require('./city_router');
const v1Routes = express.Router();

v1Routes.use('/city', cityRouter);

module.exports = v1Routes