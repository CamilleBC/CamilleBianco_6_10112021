'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type : Sequelize.STRING,
        allowNull : false,
      },
      
      email:{
       type : Sequelize.STRING,
       allowNull : false,
       validate :
        {
          isEmail : true
        },
       unique : true
      },
  
      password: {
      type : Sequelize.STRING,
      allowNull : false,
      },
  
      isAdmin : {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    await queryInterface.dropTable('Users');
  }
};