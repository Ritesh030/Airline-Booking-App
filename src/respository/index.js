const CityRepository = require('./city_repository')
const AirportRepository = require('./airport_repository')
const { Airport } = require('../models/index')

const cityRepository = new CityRepository()
const airportRepository = new AirportRepository(Airport)

module.exports = {
      cityRepository,
      airportRepository
}