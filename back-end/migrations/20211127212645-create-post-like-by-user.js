'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('post_like_by_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      postId: {
        type : Sequelize.INTEGER,
        allowNull : false
      },
      userId : {
        type : Sequelize.STRING,
        allowNull : false
      },
      liked : {
        type : Sequelize.BOOLEAN,
        allowNull : false
      },
      disliked : {
        type : Sequelize.BOOLEAN,
        allowNull : false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('post_like_by_users');
  }
};