const { airportRepository } = require("../respository/index");
const apiError = require("../utils/api_error");
const { buildApiError } = require("../utils/error_handler");

class AirportService {
      constructor(){
            this.airportRepository = airportRepository
      }

      async createAirport(data){
            try {
                  if(!data.address) data.address = ""
                  const airport = await this.airportRepository.createAirport(data)
                  return airport
            } catch (error) {
                  throw buildApiError(error, 500, "Error while creating airport in airport_service")
            }
      }

      async getAirport(airportId){
            try {
                  const airport = await this.airportRepository.getAirport(airportId)
                  if(!airport){
                        throw new apiError(404, "Airport not found")
                  }
                  return airport
            } catch (error) {
                  throw buildApiError(error, 500, "Error while geting airport in airport_service")
            }
      }

      async getAllAirport(){
            try {
                  const airports = await this.airportRepository.getAllAirport()
                  return airports
            } catch (error) {
                  throw buildApiError(error, 500, "Error while getting all airport in airport_service")
            }
      }

      async updateAirport(airportId, data){
            try {
                  const airport = await this.airportRepository.updateAirport(airportId, data)
                  return airport
            } catch (error) {
                  throw buildApiError(error, 500, "Error while updating airport in airport_service")
            }
      }

      async deleteAirport(airportId){
            try {
                  const response = await this.airportRepository.deleteAirport(airportId);
                  if(!response){
                        throw new apiError(404, "Airport not found")
                  }
                  return response
            } catch (error) {
                  throw buildApiError(error, 500, "Error while deleting airport in airport_service")
            }
      }
}

module.exports = AirportService
