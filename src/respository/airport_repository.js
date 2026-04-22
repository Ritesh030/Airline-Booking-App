const apiError = require("../utils/api_error");
const { buildApiError } = require("../utils/error_handler");
const { City } = require('../models/index')

class AirportRepository {
      constructor(Airport) {
            this.model = Airport
      } 

      async createAirport({ name, address, cityId }) {
            try {
                  const city = await City.findByPk(cityId)
                  if (!city) {
                        throw new apiError(400, "City with this id does not exists")
                  }

                  const airport = await this.model.create({
                        name: name.toLowerCase(),
                        address,
                        cityId
                  })
                  return airport
            } catch (error) {
                  throw buildApiError(error, 500, "Error while creating airport in airport_repository")
            }
      }

      async getAirport(airportId) {
            try {
                  const airport = await this.model.findByPk(airportId);
                  return airport
            } catch (error) {
                  throw buildApiError(error, 500, "Error while geting airport in airport_repository")
            }
      }

      async getAllAirport() {
            try {
                  const airports = await this.model.findAll()
                  return airports
            } catch (error) {
                  throw buildApiError(error, 500, "Error while geting all airports in airport_repository")
            }
      }

      async updateAirport(airportId, data) {
            try {
                  const airport = await this.model.findByPk(airportId)
                  if (!airport){
                        throw new apiError(400, "Airport with this id does not exists")
                  }

                  if (!data.name) data.name = airport.name;
                  if (!data.address) data.address = airport.address
                  if (!data.cityId) data.cityId = airport.cityId

                  const city = await City.findByPk(data.cityId)
                  if (!city){
                        throw new apiError(400, "City does not exits to upate in airport")
                  }

                  airport.name = data.name.toLowerCase()
                  airport.address = data.address
                  airport.cityId = data.cityId

                  await airport.save()
                  return airport
            } catch (error) {
                  throw buildApiError(error, 500, "Error while updating airport in airport_repository")
            }
      }

      async deleteAirport(airportId) {
            try {
                  const deleteAirport = await this.model.destroy({
                        where: {
                              id: airportId
                        }
                  })
                  return deleteAirport > 0;
            } catch (error) {
                  throw buildApiError(error, 500, "Error while deleting airport in airport_repository")
            }
      }
}

module.exports = AirportRepository
