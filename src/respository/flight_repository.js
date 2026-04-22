const { Op } = require("sequelize");
const apiError = require("../utils/api_error");
const { buildApiError } = require("../utils/error_handler");

class FlightRepository {
      constructor(flight) {
            this.flightModel = flight
      }

      #createFilter(data){
            data = data || {}
            let filter = {}
            if(data.arrivalAirportId){
                  filter.arrivalAirportId = data.arrivalAirportId
            }
            if(data.departureAirportId) {
                  filter.departureAirportId = data.departureAirportId
            }
            if(data.minPrice && data.maxPrice){
                  Object.assign(filter, {
                        [Op.and]: [
                              {price: {[Op.gte]: data.minPrice}},
                              {price: {[Op.lte]: data.maxPrice}}
                        ]
                  })
            }
            if(data.minPrice){
                  Object.assign(filter, {price: {[Op.gte]: data.minPrice}});
            }
            if(data.maxPrice){
                  Object.assign(filter, {price: {[Op.lte]: data.maxPrice}});
            }
            return filter
      }

      async createFlight(data) {
            try {
                  const flight = await this.flightModel.create(data);
                  return flight
            } catch (error) {
                  throw buildApiError(error, 400, "error while creating flight in repo")
            }
      }

      async getFlight(flightId){
            try {
                  const flight = await this.flightModel.findByPk(flightId)
                  return flight
            } catch (error) {
                  throw new apiError(400, "error in flight repo")
            }
      }

      async getAllFlights(filter){
            try {
                  const filterObj = this.#createFilter(filter)
                  const flights = await this.flightModel.findAll(
                        {where: filterObj}
                  )
                  return flights
            } catch (error) {
                  throw buildApiError(error, 400, "error while getting flights in repo")
            }
      }
}

module.exports = FlightRepository
