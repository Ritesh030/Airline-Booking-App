const { CrudRepository, AirplaneRepository } = require("../respository/index");

class AirplaneService extends CrudRepository {
      constructor() {
            const airplaneRepository = new AirplaneRepository()
            super(airplaneRepository)
      }
}

module.exports = AirplaneService