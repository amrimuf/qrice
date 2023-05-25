'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check the environment variable to determine if seeding should be performed
    const runSeed = process.env.RUN_SEED === 'true';

    if (runSeed) {
      await queryInterface.bulkInsert('nutrient_deficiencies', [
        {
          name: 'Deficiency 1',
          symptoms: 'Symptoms for Deficiency 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Deficiency 2',
          symptoms: 'Symptoms for Deficiency 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more nutrient deficiency data objects as needed
      ], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Always perform the down migration to delete the seeded data
    await queryInterface.bulkDelete('nutrient_deficiencies', null, {});
  }
};
