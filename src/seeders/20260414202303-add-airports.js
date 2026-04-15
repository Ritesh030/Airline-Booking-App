'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Airports',[
      {
        name:  "kempegowda international airport",
        createdAt: new Date(),
        updatedAt: new Date(),
        cityId: 12
      },
      {
        name:  "mysuru airport",
        createdAt: new Date(),
        updatedAt: new Date(),
        cityId: 12
      },
      {
        name:  "mengaluru international airport",
        createdAt: new Date(),
        updatedAt: new Date(),
        cityId: 12
      },
      {
        name:  "dr. babasaheb ambedkar international airport",
        createdAt: new Date(),
        updatedAt: new Date(),
        cityId: 13
      },
      {
        name:  "Indira Gandhi international airport",
        createdAt: new Date(),
        updatedAt: new Date(),
        cityId: 14
      },
      {
        name:  "rajmata vijayaraje scindia airport",
        createdAt: new Date(),
        updatedAt: new Date(),
        cityId: 15
      },
      {
        name:  "devi ahilya bai holkar airport",
        createdAt: new Date(),
        updatedAt: new Date(),
        cityId: 16
      },

    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
