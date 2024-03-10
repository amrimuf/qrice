'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rice_disease_history', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      rice_disease_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'rice_diseases',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      imageFilename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      predictionResult: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addConstraint('rice_disease_history', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_rice_disease_history_userId',
      references: {
        table: 'users',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('rice_disease_history', {
      fields: ['rice_disease_id'],
      type: 'foreign key',
      name: 'fk_rice_disease_history_riceDiseaseId',
      references: {
        table: 'rice_diseases',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('rice_disease_history');
  },
};
