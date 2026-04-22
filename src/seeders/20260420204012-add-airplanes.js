'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Airplanes', [
      {
        modelNumber: 'airplane-1',
        capacity: "100",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: 'airplane-2',
        capacity: "200",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: 'airplane-3',
        capacity: "300",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: 'airplane-4',
        capacity: "400",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        modelNumber: 'airplane-5',
        capacity: "500",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
