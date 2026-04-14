const { cityRepository } = require('../respository/index')

class CityService {
      constructor() {
            this.cityRepository = cityRepository
      }

      async createCity(data){
            try {
                  const city = await this.cityRepository.createCity(data)
                  return city
            } catch (error) {
                  throw {error}
            }
      }

      async deleteCity(cityId){
            try {
                  const response = await this.cityRepository.deleteCity(cityId)
                  return response
            } catch (error) {
                  throw {error}
            }
      }

      async updateCity(cityId,data){
            try {
                  const city = await this.cityRepository.updateCity(cityId,data)
                  return city
            } catch (error) {
                  throw {error}
            }
      }

      async getCity(cityId){
            try {
                  const city = await this.cityRepository.getCity(cityId)
                  return city
            } catch (error) {
                  throw {error}
            }
      }

      async getAllCities(filter){
            try {
                  const cities = await this.cityRepository.getAllCities({name: filter.name});
                  return cities
            } catch (error) {
                 throw error 
            }
      }
}

module.exports = CityService