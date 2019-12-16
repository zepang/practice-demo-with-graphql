'use strict'
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    text: DataTypes.TEXT
  }, {})
  Post.associate = function (models) {
    // associations can be defined here
    Post.belongsTo(models.User)
  }
  return Post
}
