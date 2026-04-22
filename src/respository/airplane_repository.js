const apiError = require("../utils/api_error")

class AirplaneRepository {
      constructor(Airplane) {
            this.model = Airplane
      }

      async createAirplane(data){
            try {
                  const airplane = await this.model.create(data);
                  return airplane
            } catch (error) {
                  throw new apiError(500, "Error while creating aiplane in repo")
            }
      }

      async getAirplane(airplaneId){
            const airplane  = await this.model.findByPk(airplaneId)
            return airplane
      }
}

module.exports = AirplaneRepository