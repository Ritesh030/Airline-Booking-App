const { CityService } = require("../services/index");
const apiResponse = require("../utils/api_response");
const { sendErrorResponse } = require("../utils/error_handler");

const cityService = new CityService

const create = async (req, res) => {
      try {
            const city = await cityService.createCity(req.body)

            return res.status(201)
                  .json(new apiResponse(201, city, "city created"))
      } catch (error) {
            return sendErrorResponse(res, error, "Failed to create city")
      }
}

const createMultiple = async (req, res) => {
      try {
            const cities = await cityService.createMultiCity(req.body)

            return res.status(201)
                  .json(new apiResponse(201, cities, "cities created"))
      } catch (error) {
            return sendErrorResponse(res, error, "Failed to create cities")
      }
}

const get = async (req, res) => {
      try {
            const city = await cityService.getCity(req.params.id)

            return res.status(200).json(new apiResponse(200, city))
      } catch (error) {
            return sendErrorResponse(res, error, "Failed to fetch city")
      }
}

const getAll = async (req, res) => {
      try {
            const cities = await cityService.getAllCities(req.query);
            
            return res.status(200).json(new apiResponse(200, cities))

      } catch (error) {
            return sendErrorResponse(res, error, "Failed to get all cities")
      }
}

const update = async (req, res) => {
      try {
            const city = await cityService.updateCity(req.params.id, req.body)

            return res.status(200).json(new apiResponse(200, city, "cities updated"))
      } catch (error) {
            return sendErrorResponse(res, error, "Failed to update city")
      }
}

const destroy = async (req, res) => {
      try {
            const response = await cityService.deleteCity(req.params.id)

            return res.status(200).json(new apiResponse(200, response, "city deleted"))
      } catch (error) {
            return sendErrorResponse(res, error, "Failed to delete city")
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
