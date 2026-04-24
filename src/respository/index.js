const CityRepository = require('./city_repository')
const AirportRepository = require('./airport_repository')
const { Airport, Flights, Airplane } = require('../models/index')
const FlightRepository = require('../respository/flight_repository')
const AirplaneRepository = require('./airplane_repository')
const CrudRepository = require('./crud_repository')

const cityRepository = new CityRepository()
const airportRepository = new AirportRepository(Airport)
const flightRepository = new FlightRepository(Flights)

module.exports = {
      cityRepository,
      airportRepository,
      flightRepository,
      AirplaneRepository,
      CrudRepository
}