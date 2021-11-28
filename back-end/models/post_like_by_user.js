'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_like_by_user extends Model {};
  Post_like_by_user.init({
    postId: {
      type : DataTypes.INTEGER,
      allowNull : false
    },
    userId : {
      type : DataTypes.STRING,
      allowNull : false
    },
    liked : {
      type : DataTypes.BOOLEAN,
      allowNull : false
    },
    disliked : {
      type : DataTypes.BOOLEAN,
      allowNull : false
    },
  }, {
    sequelize,
    modelName: 'Post_like_by_user',
  });
  return Post_like_by_user;
};