'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check the environment variable to determine if seeding should be performed
    const runSeed = process.env.RUN_SEED ? process.env.RUN_SEED === 'true' : 'true';

    if (runSeed) {
      await queryInterface.bulkInsert('rice_diseases', [
        {
          name: 'Bacterial Leaf Blight',
          symptoms: 'Symptoms for Leaf Blight',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Healthy',
          symptoms: 'Symptoms for Healthy',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Leaf Blast',
          symptoms: 'Symptoms for Lead Blast',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Leaf Scald',
          symptoms: 'Symptoms for Leaf Scald',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Brown Spot',
          symptoms: 'Symptoms for Brown Spot',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Narrow Brown Spot',
          symptoms: 'Symptoms for Narrow Brown Spot',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Always perform the down migration to delete the seeded data
    await queryInterface.bulkDelete('rice_diseases', null, {});
  }
};
