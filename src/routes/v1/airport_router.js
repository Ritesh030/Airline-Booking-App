const express = require('express')
const airportController = require('../../controllers/airport_controller')

const airportRouter = express.Router()

airportRouter.post('/create', airportController.create)
airportRouter.get('/:id', airportController.get)
airportRouter.get('/', airportController.getAll)
airportRouter.patch('/:id', airportController.update)
airportRouter.delete('/:id', airportController.destroy)

module.exports = airportRouter