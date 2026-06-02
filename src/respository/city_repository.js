const { Op } = require('sequelize');
const { City } = require('../models/index');
const AppError = require('../utils/AppError');
const { StatusCodes } = require('http-status-codes');

class CityRepository {
      async createCity({ name }) {
            try {
                  const city = await City.create({ name: name.toLowerCase() });
                  return city
            } catch (error) {
                  if (error instanceof AppError) throw error;
                  throw new AppError(
                        'DatabaseError',
                        'Error creating city',
                        error.message,
                        StatusCodes.INTERNAL_SERVER_ERROR
                  );
            }
      }

      async createMultiCity(data) {
            try {
                  const cities = await City.bulkCreate(data);
                  return cities
            } catch (error) {
                  if (error instanceof AppError) throw error;
                  throw new AppError(
                        'DatabaseError',
                        'Error creating multiple cities',
                        error.message,
                        StatusCodes.INTERNAL_SERVER_ERROR
                  );
            }
      }

      async getCity(cityId) {
            try {
                  const city = await City.findByPk(cityId) // since id is primary key
                  return city
            } catch (error) {
                  if (error instanceof AppError) throw error;
                  throw new AppError(
                        'DatabaseError',
                        'Error fetching city',
                        error.message,
                        StatusCodes.INTERNAL_SERVER_ERROR
                  );
            }
      }

      async getAllCities(filter) {
            try {
                  if (filter.name) {
                        const cities = await City.findAll({
                              where: {
                                    name: {
                                          [Op.startsWith]: filter.name.toLowerCase()
                                    }
                              }
                        })
                        return cities
                  }
                  const cities = await City.findAll()
                  return cities
            } catch (error) {
                  if (error instanceof AppError) throw error;
                  throw new AppError(
                        'DatabaseError',
                        'Error fetching all cities',
                        error.message,
                        StatusCodes.INTERNAL_SERVER_ERROR
                  );
            }
      }

      async updateCity(cityId, data) {
            try {
                  // const city = await City.update(data, {
                  //       where: {
                  //             id: cityId
                  //       },
                  //       returnijng:true,
                  //       plain:true
                  // }) // returning, and plain returns the obejct that is updated but are only supported in postgray

                  const city = await City.findByPk(cityId)
                  if (!city) {
                        return null
                  }
                  city.name = data.name.toLowerCase();
                  await city.save();
                  return city
            } catch (error) {
                  if (error instanceof AppError) {
                        throw error;
                  }
                  throw new AppError(
                        'DatabaseError',
                        'Error while updating city',
                        error.message || 'Unknown error occurred',
                        StatusCodes.INTERNAL_SERVER_ERROR
                  )
            }
      }

      async deleteCity(cityId) {
            try {
                  const deletedRows = await City.destroy({
                        where: {
                              id: cityId
                        }
                  })
                  return deletedRows > 0
            } catch (error) {
                  if (error instanceof AppError) throw error;
                  throw new AppError(
                        'DatabaseError',
                        'Error deleting city',
                        error.message,
                        StatusCodes.INTERNAL_SERVER_ERROR
                  );
            }
      }
}

module.exports = CityRepository
