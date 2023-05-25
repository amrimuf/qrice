'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('nutrient-deficiency-history', {
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
      nutrient_deficiency_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'nutrient_deficiencies',
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

    await queryInterface.addConstraint('nutrient-deficiency-history', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_histories_userId',
      references: {
        table: 'users',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('nutrient-deficiency-history', {
      fields: ['nutrient_deficiency_id'],
      type: 'foreign key',
      name: 'fk_histories_nutrientDeficiencyId',
      references: {
        table: 'nutrient_deficiencies',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('nutrient-deficiency-history');
  },
};
