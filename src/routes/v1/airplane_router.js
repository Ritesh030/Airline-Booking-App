const express = require('express')
const { create } = require('../../controllers/airplane_controller')

const airplaneRouter = express.Router()

airplaneRouter.post('/', create)

module.exports = airplaneRouter