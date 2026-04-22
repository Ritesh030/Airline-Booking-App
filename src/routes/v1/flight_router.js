const express = require('express');
const { create, get, getAll } = require('../../controllers/flight_controller');

const flightRouter = express.Router();

flightRouter.post('/', create)
flightRouter.get('/:id', get)
flightRouter.get('/', getAll)

module.exports = flightRouter