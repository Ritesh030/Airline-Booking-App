const { Op, where } = require('sequelize');
const { City } = require('../models/index')

class CityRepository {
      async createCity({ name }){
            try {
                  const city = await City.create({name: name.toLowerCase()});
                  return city 
            } catch (error) {
                  throw {error}
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
                  throw {error}
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
                  throw {error}
            }
      }

      async getCity(cityId){
            try {
                  const city = await City.findByPk(cityId) // since id is primary key
                  return city
            } catch (error) {
                  throw {error}
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
            } catch (err) {
                  throw err
            }
      }
}

module.exports = CityRepository
