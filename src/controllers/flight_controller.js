const { FlightService } = require("../services/index")
const apiResponse = require("../utils/api_response")
const { sendErrorResponse } = require("../utils/error_handler")

const flightService = new FlightService()

const create = async (req,res) => {
      try {
            const flight = await flightService.createFlight(req.body)

            return res.status(201).json(new apiResponse(201, flight, "flight created"))
      } catch (error) {
            return sendErrorResponse(res, error, "Failed to create flight")
      }
}

const get = async (req,res) => {
      try {
            const flight = await flightService.getFlight(req.params.id)
            return res.status(200).json(new apiResponse(200, flight, ""))
      } catch (error) {
            return sendErrorResponse(res,error,"Failed to gert flight")
      }
}

const getAll = async (req,res) => {
      try {
            const flights = await flightService.getAllFlights(req.query)
            return res.status(200).json(new apiResponse(200, flights, "flights fetched"))
      } catch (error) {
            return sendErrorResponse(res,error,"Failed to get flights")
      }
}

module.exports = {
      create,
      get,
      getAll
}
