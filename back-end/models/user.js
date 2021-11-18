const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {};
  User.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
    },
    
    email:{
     type : DataTypes.STRING,
     allowNull : false,
     validate :
      {
        isEmail : true
      },
     unique : true
    },

    password: {
    type : DataTypes.STRING,
    allowNull : false,
    },

    isAdmnin : {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};