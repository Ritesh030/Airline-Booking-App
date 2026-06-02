const { StatusCodes } = require('http-status-codes');
const { flightRepository, AirplaneRepository } = require("../respository");
const { AppError, buildAppError } = require("../utils");

class FlightService {
      constructor() {
            this.flightRepository = flightRepository;
            this.airplaneRepository = new AirplaneRepository();
      }

      async createFlight(data) {
            try {
                  if (!data || Object.keys(data).length === 0) {
                        throw new AppError('ValidationError', 'Request body is required', 'Request body cannot be empty', StatusCodes.BAD_REQUEST)
                  }

                  const airplane = await this.airplaneRepository.get(data.airplaneId);
                  if (!airplane) {
                        throw new AppError('ValidationError', 'Airplane with this id does not exist', 'Invalid airplane ID', StatusCodes.BAD_REQUEST)
                  }

                  const flight = await this.flightRepository.createFlight({
                        ...data, totalSeats: airplane.capacity
                  });
                  return flight
            } catch (error) {
                  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeForeignKeyConstraintError') {
                        console.error('[ERROR] Validation error in createFlight:', error.message)
                        throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'createFlight' })
                  }
                  if (error instanceof AppError) {
                        throw error
                  }
                  console.error('[ERROR] Error creating flight:', error.message)
                  throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'createFlight' })
            }
      }

      async getFlight(flightId) {
            try {
                  const flight = await this.flightRepository.getFlight(flightId);
                  return flight
            } catch (error) {
                  if (error instanceof AppError) {
                        throw error
                  }
                  console.error('[ERROR] Error fetching flight:', error.message)
                  throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'getFlight' })
            }
      }

      async getAllFlights(data) {
            try {
                  const flights = await this.flightRepository.getAllFlights(data);
                  return flights
            } catch (error) {
                  if (error instanceof AppError) {
                        throw error
                  }
                  console.error('[ERROR] Error fetching all flights:', error.message)
                  throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'getAllFlights' })
            }
      }

      async updateFlight(flightId, updateData) {
            try {
                  const flight = await this.flightRepository.updateFlight(flightId, updateData);
                  return flight
            } catch (error) {
                  if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeForeignKeyConstraintError') {
                        console.error('[ERROR] Validation error in updateFlight:', error.message)
                        throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'updateFlight' })
                  }
                  if (error instanceof AppError) {
                        throw error
                  }
                  console.error('[ERROR] Error updating flight:', error.message)
                  throw buildAppError(error, { serviceName: 'FlightSearchService', controllerName: 'updateFlight' })
            }
      }
}

module.exports = FlightService
