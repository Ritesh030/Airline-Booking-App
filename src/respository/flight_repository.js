const { Op } = require("sequelize");
const AppError = require('../utils/AppError');
const { StatusCodes } = require('http-status-codes');
const { sequelize } = require("../models");

class FlightRepository {
      constructor(flight) {
            this.flightModel = flight
      }

      #createFilter(data) {
            data = data || {}
            let filter = {}
            if (data.arrivalAirportId) {
                  filter.arrivalAirportId = data.arrivalAirportId
            }
            if (data.departureAirportId) {
                  filter.departureAirportId = data.departureAirportId
            }
            if (data.minPrice && data.maxPrice) {
                  Object.assign(filter, {
                        [Op.and]: [
                              { price: { [Op.gte]: data.minPrice } },
                              { price: { [Op.lte]: data.maxPrice } }
                        ]
                  })
            }
            else if (data.minPrice) {
                  Object.assign(filter, { price: { [Op.gte]: data.minPrice } });
            }
            else if (data.maxPrice) {
                  Object.assign(filter, { price: { [Op.lte]: data.maxPrice } });
            }
            return filter
      }

      async createFlight(data) {
            try {
                  const flight = await this.flightModel.create(data);
                  return flight
            } catch (error) {
                  if (error instanceof AppError) throw error;
                  throw new AppError(
                        'DatabaseError',
                        'Error creating flight',
                        error.message,
                        StatusCodes.INTERNAL_SERVER_ERROR
                  );
            }
      }

      async getFlight(flightId) {
            try {
                  const flight = await this.flightModel.findByPk(flightId)
                  return flight
            } catch (error) {
                  if (error instanceof AppError) throw error;
                  throw new AppError(
                        'DatabaseError',
                        'Error fetching flight',
                        error.message,
                        StatusCodes.INTERNAL_SERVER_ERROR
                  );
            }
      }

      async getAllFlights(filter) {
            try {
                  const filterObj = this.#createFilter(filter)
                  const flights = await this.flightModel.findAll(
                        { where: filterObj }
                  )
                  return flights
            } catch (error) {
                  if (error instanceof AppError) throw error;
                  throw new AppError(
                        'DatabaseError',
                        'Error fetching flights',
                        error.message,
                        StatusCodes.INTERNAL_SERVER_ERROR
                  );
            }
      }

      async decrementSeats(flightId, seatsToDecrement) {
            try {
                  const [updatedRowCount] = await this.flightModel.update(
                        { totalSeats: sequelize.literal(`totalSeats - ${seatsToDecrement}`) },
                        {
                              where: {
                                    id: flightId,
                                    totalSeats: { [Op.gte]: seatsToDecrement }
                              }
                        }
                  )

                  if (updatedRowCount === 0) {
                        throw new AppError(
                              'SeatUnavailableError',
                              'Not enough seats available',
                              `Flight ${flightId} does not have ${seatsToDecrement} seats left`,
                              StatusCodes.CONFLICT
                        )
                  }

                  return true
            } catch (error) {
                  if (error instanceof AppError) throw error
                  throw new AppError(
                        'DatabaseError',
                        'Error updating flight seats',
                        error.message,
                        StatusCodes.INTERNAL_SERVER_ERROR
                  )
            }
      }
}

module.exports = FlightRepository
