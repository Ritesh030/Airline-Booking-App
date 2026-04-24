const {AirplaneService} = require('../services/index');
const apiResponse = require('../utils/api_response');
const { sendErrorResponse } = require('../utils/error_handler');

const airplaneService = new AirplaneService()

const create = async (req,res) => {
      try {
            const result = await airplaneService.create(req.body);
      
            return res.status(201).json(new apiResponse(201, result, "airplane created"))
      } catch (error) {
            return sendErrorResponse(res, error, "Failed to create airplane")
      }
}

module.exports = {
      create
}
