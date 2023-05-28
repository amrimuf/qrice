'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check the environment variable to determine if seeding should be performed
    const runSeed = process.env.RUN_SEED ? process.env.RUN_SEED === 'true' : 'true';

    if (runSeed) {
      await queryInterface.bulkInsert('rice_varieties', [
        {
          name: 'Arborio',
          description: 'Description for Arborio',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Basmati',
          description: 'Description for Basmati',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Ipsala',
          description: 'Description for Ipsala',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Jasmine',
          description: 'Description for Jasmine',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Karacadag',
          description: 'Description for Karacadag',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ], {});
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Always perform the down migration to delete the seeded data
    await queryInterface.bulkDelete('rice_varieties', null, {});
  }
};
