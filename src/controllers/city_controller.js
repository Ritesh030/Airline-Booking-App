const { CityService } = require("../services");

const cityService = new CityService

const create = async (req,res) => {
      try {
            const city = await cityService.createCity(req.body)
            return res.status(201)
                      .json({
                        data: city,
                        success: true,
                        message: "City created successfully",
                        err: {}
                      })
      } catch (error) {
            return res.status(500).json({
                  data: {},
                  success: false,
                  message: "failed to create city",
                  err: error
            })
      }
}

const destroy = async (req,res) => {
      try {
            const response = await cityService.deleteCity(req.params.id)
            if (!response) {
                  return res.status(404).json({
                        data: {},
                        success: false,
                        message: "city not found",
                        err: {}
                  })
            }
            return res.status(200).json({
                  data: response,
                  success: true,
                  message: "city deleted successfully",
                  err: {}
            })
      } catch (error) {
            return res.status(500).json({
                  data: {},
                  success: false,
                  message: "failed to delete city",
                  err: error
            })
      }
}

const get = async (req,res) => {
      try {
            const city = await cityService.getCity(req.params.id)
            if (!city) {
                  return res.status(404).json({
                        data: {},
                        success: false,
                        message: "city not found",
                        err: {}
                  })
            }
            return res.status(200).json({
                  data: city,
                  success: true,
                  message: "city fetched successfully",
                  err: {}
            })
      } catch (error) {
            return res.status(500).json({
                  data: {},
                  success: false,
                  message: "failed to fetch city",
                  err: error
            })
      }
}

const update = async (req,res) => {
      try {
            const city = await cityService.updateCity(req.params.id, req.body)
            if (!city) {
                  return res.status(404).json({
                        data: {},
                        success: false,
                        message: "city not found",
                        err: {}
                  })
            }
            return res.status(200).json({
                  data: city,
                  success: true,
                  message: "city updated successfully",
                  err: {}
            })
      } catch (error) {
            return res.status(500).json({
                  data: {},
                  success: false,
                  message: "failed to update city",
                  err: error
            })
      }
}

const getAll = async (req,res) => {
      try {
            const cities = await cityService.getAllCities(req.query);
            return res.status(200).json({
                  data: cities,
                  success: true,
                  message: "cities fetched successfully",
                  err: {}
            })

      } catch (error) {
            return res.status(500).json({
                  data: {},
                  success: false,
                  message: "failed to get all cities",
                  err: error
            })
      }
}

module.exports = {
      create,
      get,
      destroy,
      update,
      getAll
}