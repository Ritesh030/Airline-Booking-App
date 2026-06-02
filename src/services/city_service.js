const { StatusCodes } = require('http-status-codes');
const { cityRepository } = require('../respository/index')
const { AppError, buildAppError } = require('../utils')

class CityService {
      constructor() {
            this.cityRepository = cityRepository
      }

      async createCity(data) {
            try {
                  const city = await this.cityRepository.createCity(data)
                  return city
            } catch (error) {
                  // Handle Sequelize validation errors separately
                  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeForeignKeyConstraintError') {
                        console.error('[ERROR] Validation error in createCity:', error.message)
                        throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'createCity' })
                  }
                  if (error instanceof AppError) {
                        throw error
                  }
                  console.error('[ERROR] Error creating city:', error.message)
                  throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'createCity' })
            }
      }

      async createMultiCity(data) {
            try {
                  data.forEach(entry => {
                        entry.name = entry.name.toLowerCase();
                  });
                  const cities = await this.cityRepository.createMultiCity(data)
                  return cities
            } catch (error) {
                  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeForeignKeyConstraintError') {
                        console.error('[ERROR] Validation error in createMultiCity:', error.message)
                        throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'createMultiCity' })
                  }
                  if (error instanceof AppError) {
                        throw error
                  }
                  console.error('[ERROR] Error creating multiple cities:', error.message)
                  throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'createMultiCity' })
            }
      }

      async getCity(cityId) {
            try {
                  const city = await this.cityRepository.getCity(cityId)
                  if (!city) {
                        throw new AppError('NotFoundError', 'City not found', 'The requested city does not exist', StatusCodes.NOT_FOUND)
                  }
                  return city
            } catch (error) {
                  if (error instanceof AppError) {
                        throw error
                  }
                  console.error('[ERROR] Error fetching city:', error.message)
                  throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'getCity' })
            }
      }

      async getAllCities(filter) {
            try {
                  const cities = await this.cityRepository.getAllCities({ name: filter.name });
                  return cities
            } catch (error) {
                  if (error instanceof AppError) {
                        throw error
                  }
                  console.error('[ERROR] Error fetching all cities:', error.message)
                  throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'getAllCities' })
            }
      }

      async updateCity(cityId, data) {
            try {
                  const city = await this.cityRepository.updateCity(cityId, data)
                  if (!city) {
                        throw new AppError('NotFoundError', 'City not found', 'The requested city does not exist', StatusCodes.NOT_FOUND)
                  }
                  return city
            } catch (error) {
                  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeForeignKeyConstraintError') {
                        console.error('[ERROR] Validation error in updateCity:', error.message)
                        throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'updateCity' })
                  }
                  if (error instanceof AppError) {
                        throw error
                  }
                  console.error('[ERROR] Error updating city:', error.message)
                  throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'updateCity' })
            }
      }

      async deleteCity(cityId) {
            try {
                  const response = await this.cityRepository.deleteCity(cityId)
                  if (!response) {
                        throw new AppError('NotFoundError', 'City not found', 'The requested city does not exist', StatusCodes.NOT_FOUND)
                  }
                  return response
            } catch (error) {
                  if (error instanceof AppError) {
                        throw error
                  }
                  console.error('[ERROR] Error deleting city:', error.message)
                  throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'deleteCity' })
            }
      }
}

module.exports = CityService
