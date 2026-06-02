const { StatusCodes } = require('http-status-codes');
const { AirportService } = require("../services/index");
const { sendSuccessResponse, sendErrorResponse } = require("../utils");

const airportService = new AirportService

const create = async (req, res) => {
      try {
            const airport = await airportService.createAirport(req.body);
            return sendSuccessResponse(res, StatusCodes.CREATED, "airport created", airport);
      } catch (error) {
            return sendErrorResponse(res, error);
      }
}

const get = async (req, res) => {
      try {
            const airport = await airportService.getAirport(req.params.id);
            return sendSuccessResponse(res, StatusCodes.OK, "airport fetched", airport);
      } catch (error) {
            return sendErrorResponse(res, error);
      }
}

const getAll = async (req, res) => {
      try {
            const airports = await airportService.getAllAirport();
            return sendSuccessResponse(res, StatusCodes.OK, "airports fetched", airports);
      } catch (error) {
            return sendErrorResponse(res, error);
      }
}

const update = async (req, res) => {
      try {
            const airport = await airportService.updateAirport(req.params.id, req.body);
            return sendSuccessResponse(res, StatusCodes.OK, "airport updated", airport);
      } catch (error) {
            return sendErrorResponse(res, error);
      }
}

const destroy = async (req, res) => {
      try {
            const response = await airportService.deleteAirport(req.params.id);
            return sendSuccessResponse(res, StatusCodes.OK, "airport deleted", response);
      } catch (error) {
            return sendErrorResponse(res, error);
      }
}

module.exports = {
      create,
      get,
      destroy,
      update,
      getAll
}
