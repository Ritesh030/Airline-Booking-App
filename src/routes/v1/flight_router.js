const express = require('express');
const { create, get, getAll, update } = require('../../controllers/flight_controller');
const { validateCreateFlight } = require('../../middlewares');

const flightRouter = express.Router();

flightRouter.post('/', validateCreateFlight, create)
flightRouter.get('/:id', get)
flightRouter.patch('/:id', update)
flightRouter.get('/', getAll)

module.exports = flightRouter