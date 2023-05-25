'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check the environment variable to determine if seeding should be performed
    const runSeed = process.env.RUN_SEED === 'true';

    if (runSeed) {
      await queryInterface.bulkInsert('rice_diseases', [
        {
          name: 'Disease 1',
          symptoms: 'Symptoms for Disease 1',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Disease 2',
          symptoms: 'Symptoms for Disease 2',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more rice disease data objects as needed
      ], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Always perform the down migration to delete the seeded data
    await queryInterface.bulkDelete('rice_diseases', null, {});
  }
};
