const CityRepository = require('./city_repository')
const AirportRepository = require('./airport_repository')
const { Airport, Flights, Airplane } = require('../models/index')
const FlightRepository = require('../respository/flight_repository')
const AirplaneRepository = require('./airplane_repository')

const cityRepository = new CityRepository()
const airportRepository = new AirportRepository(Airport)
const flightRepository = new FlightRepository(Flights)
const airplaneRepository = new AirplaneRepository(Airplane)

module.exports = {
      cityRepository,
      airportRepository,
      flightRepository,
      airplaneRepository
}