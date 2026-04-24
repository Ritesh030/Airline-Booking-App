const apiError = require("../utils/api_error")

const validateCreateFlight = async (req,res,next) => {
      if(
            !req.body.flightNumber ||
            !req.body.airplaneId ||
            !req.body.departureAirportId ||
            !req.body.arrivalAirportId ||
            !req.body.arrivalTime ||
            !req.body.departureTime ||
            !req.body.price
      ){
            throw new apiError(400, "all the fields are required")
      }
      next()
}

module.exports = {
      validateCreateFlight
}