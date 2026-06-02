const { City } = require('../models/index')
const AppError = require('../utils/AppError');
const { StatusCodes } = require('http-status-codes');

class AirportRepository {
      constructor(Airport) {
            this.model = Airport
      }

      async createAirport({ name, address, cityId }) {
            try {
                  const city = await City.findByPk(cityId)
                  if (!city) {
                        throw new AppError(
                              'ValidationError',
                              'City does not exist',
                              `City with id ${cityId} not found`,
                              StatusCodes.BAD_REQUEST
                        )
                  }

                  const airport = await this.model.create({
                        name: name.toLowerCase(),
                        address,
                        cityId
                  })
                  return airport
            } catch (error) {
                  if (error instanceof AppError) throw error;
                  throw new AppError(
                        'DatabaseError',
                        'Error creating airport',
                        error.message,
                        StatusCodes.INTERNAL_SERVER_ERROR
                  );
            }
      }

      async getAirport(airportId) {
            try {
                  const airport = await this.model.findByPk(airportId);
                  return airport
            } catch (error) {
                  if (error instanceof AppError) throw error;
                  throw new AppError(
                        'DatabaseError',
                        'Error fetching airport',
                        error.message,
                        StatusCodes.INTERNAL_SERVER_ERROR
                  );
            }
      }

      async getAllAirport() {
            try {
                  const airports = await this.model.findAll()
                  return airports
            } catch (error) {
                  if (error instanceof AppError) throw error;
                  throw new AppError(
                        'DatabaseError',
                        'Error fetching airports',
                        error.message,
                        StatusCodes.INTERNAL_SERVER_ERROR
                  );
            }
      }

      async updateAirport(airportId, data) {
            try {
                  const airport = await this.model.findByPk(airportId)
                  if (!airport) {
                        throw new AppError(
                              'NotFoundError',
                              'Airport not found',
                              `Airport with id ${airportId} does not exist`,
                              StatusCodes.NOT_FOUND
                        )
                  }

                  if (!data.name) data.name = airport.name;
                  if (!data.address) data.address = airport.address
                  if (!data.cityId) data.cityId = airport.cityId

                  const city = await City.findByPk(data.cityId)
                  if (!city) {
                        throw new AppError(
                              'ValidationError',
                              'City does not exist for update',
                              `City with id ${data.cityId} not found`,
                              StatusCodes.BAD_REQUEST
                        )
                  }

                  airport.name = data.name.toLowerCase()
                  airport.address = data.address
                  airport.cityId = data.cityId

                  await airport.save()
                  return airport
            } catch (error) {
                  if (error instanceof AppError) throw error;
                  throw new AppError(
                        'DatabaseError',
                        'Error updating airport',
                        error.message,
                        StatusCodes.INTERNAL_SERVER_ERROR
                  );
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
                  if (error instanceof AppError) throw error;
                  throw new AppError(
                        'DatabaseError',
                        'Error deleting airport',
                        error.message,
                        StatusCodes.INTERNAL_SERVER_ERROR
                  );
            }
      }
}

module.exports = AirportRepository