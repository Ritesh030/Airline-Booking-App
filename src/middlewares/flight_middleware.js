const { AppError } = require("../utils")
const { StatusCodes } = require("http-status-codes")

const validateCreateFlight = async (req, res, next) => {
      if (
            !req.body.flightNumber ||
            !req.body.airplaneId ||
            !req.body.departureAirportId ||
            !req.body.arrivalAirportId ||
            !req.body.arrivalTime ||
            !req.body.departureTime ||
            !req.body.price
      ) {
            throw new AppError('ValidationError', 'all the fields are required', 'All required fields must be provided', StatusCodes.BAD_REQUEST)
      }
      next()
}

module.exports = {
      validateCreateFlight
}