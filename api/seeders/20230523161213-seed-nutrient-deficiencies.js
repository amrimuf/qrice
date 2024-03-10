'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check the environment variable to determine if seeding should be performed
    const runSeed = process.env.RUN_SEED ? process.env.RUN_SEED === 'true' : 'true';

    if (runSeed) {
      await queryInterface.bulkInsert('nutrient_deficiencies', [
        {
          name: 'Nitrogen',
          symptoms: 'Symptoms for Nitrogen',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Phosphorus',
          symptoms: 'Symptoms for Phosphorus',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Potassium',
          symptoms: 'Symptoms for Potassium',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Always perform the down migration to delete the seeded data
    await queryInterface.bulkDelete('nutrient_deficiencies', null, {});
  }
};
