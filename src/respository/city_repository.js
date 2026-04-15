const { Op } = require('sequelize');
const { buildApiError } = require("../utils/error_handler");
const { City } = require('../models/index')

class CityRepository {
      async createCity({ name }){
            try {
                  const city = await City.create({name: name.toLowerCase()});
                  return city 
            } catch (error) {
                  throw buildApiError(error, 500, "Error while creating city in city_repository")
            }
      }

      async createMultiCity(data){
            try {
                  const cities = await City.bulkCreate(data);
                  return cities
            } catch (error) {
                  throw buildApiError(error, 500, "Error while creating multiple cities in city_repository")
            }
      }

      async getCity(cityId){
            try {
                  const city = await City.findByPk(cityId) // since id is primary key
                  return city
            } catch (error) {
                  throw buildApiError(error, 500, "Error while geting city in city_repository")
            }
      }

      async getAllCities(filter){
            try {
                  if(filter.name){
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
                  throw buildApiError(error, 500, "Error while geting all cities in city_repository")
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
                  throw buildApiError(error, 500, "Error while updating city in city_repository")
            }
      }

       async deleteCity(cityId) {
            try {
                  const deletedRows = await City.destroy({
                        where: {
                              id:cityId
                        }
                  })
                  return deletedRows > 0
            } catch (error) {
                  throw buildApiError(error, 500, "Error while deleting city in city_repository")
            }
      }
}

module.exports = CityRepository
