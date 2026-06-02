const AppError = require('../utils/AppError');
const { StatusCodes } = require('http-status-codes');

class CrudRepository {
      constructor(model) {
            this.model = model
      }

      async create(data) {
            try {
                  const createdData = await this.model.create(data);
                  return createdData
            } catch (error) {
                  if (error instanceof AppError) throw error;
                  throw new AppError(
                        'DatabaseError',
                        'Error creating record',
                        error.message,
                        StatusCodes.INTERNAL_SERVER_ERROR
                  );
            }
      }

      async get(id) {
            try {
                  const data = await this.model.findByPk(id);
                  return data
            } catch (error) {
                  if (error instanceof AppError) throw error;
                  throw new AppError(
                        'DatabaseError',
                        'Error fetching record',
                        error.message,
                        StatusCodes.INTERNAL_SERVER_ERROR
                  );
            }
      }

      async getAll() {
            try {
                  const data = await this.model.findAll();
                  return data;
            } catch (error) {
                  if (error instanceof AppError) throw error;
                  throw new AppError(
                        'DatabaseError',
                        'Error fetching records',
                        error.message,
                        StatusCodes.INTERNAL_SERVER_ERROR
                  );
            }
      }

      async update(id, data) {
            try {
                  const updatedData = await this.model.update(data, {
                        where: {
                              id: id
                        },
                  })
                  return updatedData
            } catch (error) {
                  if (error instanceof AppError) throw error;
                  throw new AppError(
                        'DatabaseError',
                        'Error updating record',
                        error.message,
                        StatusCodes.INTERNAL_SERVER_ERROR
                  );
            }
      }

      async destroy(id) {
            try {
                  const result = await this.model.destroy({
                        where: {
                              id
                        }
                  })
                  return result
            } catch (error) {
                  if (error instanceof AppError) throw error;
                  throw new AppError(
                        'DatabaseError',
                        'Error deleting record',
                        error.message,
                        StatusCodes.INTERNAL_SERVER_ERROR
                  );
            }
      }
}

module.exports = CrudRepository