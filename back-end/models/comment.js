'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {};
  Comment.init({
    userId : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    postId : {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    userName: {
      type : DataTypes.STRING,
      allowNull : false
    },
    content : {
      type : DataTypes.STRING,
      allowNull : false
    }
  }, 
  {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};