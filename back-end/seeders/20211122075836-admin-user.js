'use strict';
const bcrypt = require('bcrypt');
const hash = bcrypt.hashSync('Groupomania.2021@76398', 10);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
       name: 'Admin',
       email : 'groupomania.admin@gmail.com',
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
