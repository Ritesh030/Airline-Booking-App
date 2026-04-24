const express = require('express');
const { create, get, getAll } = require('../../controllers/flight_controller');
const { validateCreateFlight } = require('../../middlewares');

const flightRouter = express.Router();

flightRouter.post('/', validateCreateFlight, create)
flightRouter.get('/:id', get)
flightRouter.get('/', getAll)

module.exports = flightRouter