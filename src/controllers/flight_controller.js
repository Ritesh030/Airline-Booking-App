const { StatusCodes } = require('http-status-codes');
const { FlightService } = require("../services/index");
const { sendSuccessResponse, sendErrorResponse } = require("../utils");

const flightService = new FlightService()

const create = async (req, res) => {
      try {
            const flightReqData = {
                  flightNumber: req.body.flightNumber,
                  airplaneId: req.body.airplaneId,
                  departureAirportId: req.body.departureAirportId,
                  arrivalAirportId: req.body.arrivalAirportId,
                  arrivalTime: req.body.arrivalTime,
                  departureTime: req.body.departureTime,
                  price: req.body.price
            };
            const flight = await flightService.createFlight(flightReqData);
            return sendSuccessResponse(res, StatusCodes.CREATED, "flight created", flight);
      } catch (error) {
            return sendErrorResponse(res, error);
      }
}

const get = async (req, res) => {
      try {
            const flight = await flightService.getFlight(req.params.id);
            return sendSuccessResponse(res, StatusCodes.OK, "flight fetched", flight);
      } catch (error) {
            return sendErrorResponse(res, error);
      }
}

const getAll = async (req, res) => {
      try {
            const flights = await flightService.getAllFlights(req.query);
            return sendSuccessResponse(res, StatusCodes.OK, "flights fetched", flights);
      } catch (error) {
            return sendErrorResponse(res, error);
      }
}

const update = async (req, res) => {
      try {
            const flightId = req.params.id;
            const updateData = req.body;
            const flight = await flightService.updateFlight(flightId, updateData);
            return sendSuccessResponse(res, StatusCodes.OK, "flight updated", flight);
      } catch (error) {
            return sendErrorResponse(res, error);
      }
}

module.exports = {
      create,
      get,
      getAll,
      update
}
