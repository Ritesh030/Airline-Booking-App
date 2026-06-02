const { buildAppError, AppError } = require('../utils');

class CrudService {
      constructor(repository) {
            this.repository = repository
      }

      async create(data) {
            try {
                  const result = await this.repository.create(data)
                  return result
            } catch (error) {
                  // Handle Sequelize validation errors separately
                  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeForeignKeyConstraintError') {
                        console.error('[ERROR] Validation error in create:', error.message)
                        throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'create' })
                  }
                  // Re-throw AppError instances as-is
                  if (error instanceof AppError) {
                        throw error
                  }
                  console.error('[ERROR] Database error in create:', error.message)
                  throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'create' })
            }
      }

      async get(id) {
            try {
                  const result = await this.repository.get(id);
                  return result
            } catch (error) {
                  if (error instanceof AppError) {
                        throw error
                  }
                  console.error('[ERROR] Database error in get:', error.message)
                  throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'get' })
            }
      }

      async getAll() {
            try {
                  const result = await this.repository.getAll()
                  return result
            } catch (error) {
                  if (error instanceof AppError) {
                        throw error
                  }
                  console.error('[ERROR] Database error in getAll:', error.message)
                  throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'getAll' })
            }
      }

      async update(id, data) {
            try {
                  const result = await this.repository.update(id, data)
                  return result
            } catch (error) {
                  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeForeignKeyConstraintError') {
                        console.error('[ERROR] Validation error in update:', error.message)
                        throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'update' })
                  }
                  if (error instanceof AppError) {
                        throw error
                  }
                  console.error('[ERROR] Database error in update:', error.message)
                  throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'update' })
            }
      }

      async destroy(id) {
            try {
                  const result = await this.repository.destroy(id);
                  return result
            } catch (error) {
                  if (error instanceof AppError) {
                        throw error
                  }
                  console.error('[ERROR] Database error in destroy:', error.message)
                  throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'destroy' })
            }
      }
}

module.exports = CrudService