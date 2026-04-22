const { flightRepository, airplaneRepository } = require("../respository");
const apiError = require("../utils/api_error");
const { buildApiError } = require("../utils/error_handler");

class FlightService {
      constructor() {
            this.flightRepository = flightRepository,
            this.airplaneRepository = airplaneRepository
      }

      async createFlight(data){
            try {
                  if (!data || Object.keys(data).length === 0) {
                        throw new apiError(400, "Request body is required")
                  }

                  const airplane = await this.airplaneRepository.getAirplane(data.airplaneId);
                  if (!airplane) {
                        throw new apiError(400, "Airplane with this id does not exist")
                  }

                  const flight = await this.flightRepository.createFlight({
                        ...data, totalSeats: airplane.capacity
                  });
                  return flight
            } catch (error) {
                  throw buildApiError(error, 400, "error while creating flight in service layer")
            }
      }

      async getFlight(flightId){
            try {
                  const flight = await this.flightRepository.getFlight(flightId);
                  return flight
            } catch (error) {
                  throw new apiError(400, "error while getting flight in service")
            }
      }

      async getAllFlights(data){
            try {
                  const flights = await this.flightRepository.getAllFlights(data);
                  return flights
            } catch (error) {
                  throw new apiError(400, "error while getting all Flights")
            }
      }
}

module.exports = FlightService
