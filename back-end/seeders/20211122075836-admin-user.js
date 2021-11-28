'use strict';
require('dotenv').config()
const bcrypt = require('bcrypt');
const hash = bcrypt.hashSync(process.env.adminPassword, 10);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
       name: 'Admin',
       email : process.env.adminEmail,
       password : hash,
       isAdmin : true,
       createdAt : new Date(),
       updatedAt : new Date()
      }]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('Users', null, {});
  }
};
