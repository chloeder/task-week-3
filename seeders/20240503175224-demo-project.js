"use strict";

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
    await queryInterface.bulkInsert("projects", [
      {
        name: "Project 1",
        startDate: new Date(),
        endDate: new Date(),
        description: "Project 1 description",
        technologies: ["react", "node-js", "android"],
        image:
          "https://www.pwc.com/content/dam/pwc/cz/cs/technology-consulting/kariera/hero_telekomunikace.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("projects", null, {});
  },
};
