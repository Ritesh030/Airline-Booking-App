const { CrudRepository, AirplaneRepository } = require("../respository/index");
const CrudService = require("./crud_service");

class AirplaneService extends CrudService {
      constructor() {
            const airplaneRepository = new AirplaneRepository()
            super(airplaneRepository)
      }
}

module.exports = AirplaneService