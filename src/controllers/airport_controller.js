const { AirportService } = require("../services");
const apiResponse = require("../utils/api_response");
const { sendErrorResponse } = require("../utils/error_handler");

const airportService = new AirportService

const create = async (req,res) => {
      try {
            const airport = await airportService.createAirport(req.body)
            return res.status(201)
                      .json(new apiResponse(201, airport, "airport created"))
      } catch (error) {
            return sendErrorResponse(res, error, "Failed to create airport")
      }
}

const get = async (req,res) => {
      try {
            const airport = await airportService.getAirport(req.params.id)
          
            return res.status(200).json(new apiResponse(200, airport))
      } catch (error) {
            return sendErrorResponse(res, error, "Failed to fetch airport")
      }
}

const getAll = async (req,res) => {
      try {
            const airports = await airportService.getAllAirport();

            return res.status(200).json(new apiResponse(200, airports))

      } catch (error) {
            return sendErrorResponse(res, error, "Failed to get all airports")
      }
}

const update = async (req,res) => {
      try {
            const airport = await airportService.updateAirport(req.params.id, req.body)
        
            return res.status(200).json(new apiResponse(200, airport, "airport updated"))
      } catch (error) {
            return sendErrorResponse(res, error, "Failed to update airport")
      }
}

const destroy = async (req,res) => {
      try {
            const response = await airportService.deleteAirport(req.params.id)
      
            return res.status(200).json(new apiResponse(200, response, "airport deleted"))
      } catch (error) {
            return sendErrorResponse(res, error, "Failed to delete airport")
      }
}

module.exports = {
      create,
      get,
      destroy,
      update,
      getAll
}
