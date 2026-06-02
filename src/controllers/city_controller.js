const { StatusCodes } = require('http-status-codes');
const { CityService } = require("../services/index");
const { sendSuccessResponse, sendErrorResponse } = require("../utils");

const cityService = new CityService

const create = async (req, res) => {
      try {
            const city = await cityService.createCity(req.body);
            return sendSuccessResponse(res, StatusCodes.CREATED, "city created", city);
      } catch (error) {
            return sendErrorResponse(res, error);
      }
}

const createMultiple = async (req, res) => {
      try {
            const cities = await cityService.createMultiCity(req.body);
            return sendSuccessResponse(res, StatusCodes.CREATED, "cities created", cities);
      } catch (error) {
            return sendErrorResponse(res, error);
      }
}

const get = async (req, res) => {
      try {
            const city = await cityService.getCity(req.params.id);
            return sendSuccessResponse(res, StatusCodes.OK, "city fetched", city);
      } catch (error) {
            return sendErrorResponse(res, error);
      }
}

const getAll = async (req, res) => {
      try {
            const cities = await cityService.getAllCities(req.query);
            return sendSuccessResponse(res, StatusCodes.OK, "cities fetched", cities);
      } catch (error) {
            return sendErrorResponse(res, error);
      }
}

const update = async (req, res) => {
      try {
            const city = await cityService.updateCity(req.params.id, req.body);
            return sendSuccessResponse(res, StatusCodes.OK, "city updated", city);
      } catch (error) {
            return sendErrorResponse(res, error);
      }
}

const destroy = async (req, res) => {
      try {
            const response = await cityService.deleteCity(req.params.id);
            return sendSuccessResponse(res, StatusCodes.OK, "city deleted", response);
      } catch (error) {
            return sendErrorResponse(res, error);
      }
}

module.exports = {
      create,
      get,
      destroy,
      update,
      getAll,
      createMultiple
}
