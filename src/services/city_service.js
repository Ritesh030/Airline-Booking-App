const { cityRepository } = require('../respository/index')
const apiError = require('../utils/api_error')
const { buildApiError } = require('../utils/error_handler')

class CityService {
      constructor() {
            this.cityRepository = cityRepository
      }

      async createCity(data){
            try {
                  const city = await this.cityRepository.createCity(data)
                  return city
            } catch (error) {
                  throw buildApiError(error, 500, "Error while creating city in city_service")
            }
      }

      async createMultiCity(data){
            try {
                  data.forEach(entry => {
                        entry.name = entry.name.toLowerCase();
                  });
                  const cities = await this.cityRepository.createMultiCity(data)
                  return cities
            } catch (error) {
                  throw buildApiError(error, 500, "Error while creating multiple city in city_service")
            }
      }

      async getCity(cityId){
            try {
                  const city = await this.cityRepository.getCity(cityId)
                  if(!city){
                        throw new apiError(404, "City not found")
                  }
                  return city
            } catch (error) {
                  throw buildApiError(error, 500, "Error while geting city in city_service")
            }
      }

      async getAllCities(filter){
            try {
                  const cities = await this.cityRepository.getAllCities({name: filter.name});
                  return cities
            } catch (error) {
                 throw buildApiError(error, 500, "Error while geting all city in city_service")
            }
      }
      
      async updateCity(cityId,data){
            try {
                  const city = await this.cityRepository.updateCity(cityId,data)
                  if(!city){
                        throw new apiError(404, "City not found")
                  }
                  return city
            } catch (error) {
                  throw buildApiError(error, 500, "Error while updating city in city_service")
            }
      }
      
      async deleteCity(cityId){
            try {
                  const response = await this.cityRepository.deleteCity(cityId)
                  if(!response){
                        throw new apiError(404, "City not found")
                  }
                  return response
            } catch (error) {
                  throw buildApiError(error, 500, "Error while deleting city in city_service")
            }
      }
}

module.exports = CityService
