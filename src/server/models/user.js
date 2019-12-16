'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    avatar: DataTypes.STRING,
    username: DataTypes.STRING
  }, {})
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Post)
    User.hasMany(models.Message)
    User.belongsToMany(models.Chat, { through: 'user-chat' })
  }
  return User
}
