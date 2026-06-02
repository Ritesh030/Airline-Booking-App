const { StatusCodes } = require('http-status-codes');
const { airportRepository } = require("../respository/index");
const { AppError, buildAppError } = require("../utils");

class AirportService {
      constructor() {
            this.airportRepository = airportRepository
      }

      async createAirport(data) {
            try {
                  if (!data.address) data.address = ""
                  const airport = await this.airportRepository.createAirport(data)
                  return airport
            } catch (error) {
                  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeForeignKeyConstraintError') {
                        console.error('[ERROR] Validation error in createAirport:', error.message)
                        throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'createAirport' })
                  }
                  if (error instanceof AppError) {
                        throw error
                  }
                  console.error('[ERROR] Error creating airport:', error.message)
                  throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'createAirport' })
            }
      }

      async getAirport(airportId) {
            try {
                  const airport = await this.airportRepository.getAirport(airportId)
                  if (!airport) {
                        throw new AppError('NotFoundError', 'Airport not found', 'The requested airport does not exist', StatusCodes.NOT_FOUND)
                  }
                  return airport
            } catch (error) {
                  if (error instanceof AppError) {
                        throw error
                  }
                  console.error('[ERROR] Error fetching airport:', error.message)
                  throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'getAirport' })
            }
      }

      async getAllAirport() {
            try {
                  const airports = await this.airportRepository.getAllAirport()
                  return airports
            } catch (error) {
                  if (error instanceof AppError) {
                        throw error
                  }
                  console.error('[ERROR] Error fetching all airports:', error.message)
                  throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'getAllAirport' })
            }
      }

      async updateAirport(airportId, data) {
            try {
                  const airport = await this.airportRepository.updateAirport(airportId, data)
                  return airport
            } catch (error) {
                  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeForeignKeyConstraintError') {
                        console.error('[ERROR] Validation error in updateAirport:', error.message)
                        throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'updateAirport' })
                  }
                  if (error instanceof AppError) {
                        throw error
                  }
                  console.error('[ERROR] Error updating airport:', error.message)
                  throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'updateAirport' })
            }
      }

      async deleteAirport(airportId) {
            try {
                  const response = await this.airportRepository.deleteAirport(airportId);
                  if (!response) {
                        throw new AppError('NotFoundError', 'Airport not found', 'The requested airport does not exist', StatusCodes.NOT_FOUND)
                  }
                  return response
            } catch (error) {
                  if (error instanceof AppError) {
                        throw error
                  }
                  console.error('[ERROR] Error deleting airport:', error.message)
                  throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'deleteAirport' })
            }
      }
}

module.exports = AirportService
