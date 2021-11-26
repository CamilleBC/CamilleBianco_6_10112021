'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {};
  Post.init({
    userId : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    userName : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    titre:{
      type : DataTypes.STRING,
      allowNull : false      
    },
    description : {
      type : DataTypes.STRING,
      allowNull : false
    },
    imageUrl : {
      type : DataTypes.STRING,
      allowNull : false
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};