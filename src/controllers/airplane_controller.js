const { StatusCodes } = require('http-status-codes');
const { AirplaneService } = require('../services/index');
const { sendSuccessResponse, sendErrorResponse } = require('../utils');

const airplaneService = new AirplaneService()

const create = async (req, res) => {
      try {
            const result = await airplaneService.create(req.body);
            return sendSuccessResponse(res, StatusCodes.CREATED, "airplane created", result);
      } catch (error) {
            return sendErrorResponse(res, error);
      }
}

module.exports = {
      create
}
