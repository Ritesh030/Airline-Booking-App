const express = require('express')
const cityController = require('../../controllers/city_controller.js')
const cityRouter = express.Router()

cityRouter.post('/create', cityController.create)
cityRouter.get('/:id', cityController.getAll)
cityRouter.get('/', cityController.getAll)
cityRouter.patch('/:id', cityController.update)
cityRouter.delete('/:id', cityController.destroy)

module.exports = cityRouter