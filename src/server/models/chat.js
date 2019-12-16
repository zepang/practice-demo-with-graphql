'use strict'
module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    content: DataTypes.TEXT
  }, {})
  Chat.associate = function (models) {
    // associations can be defined here
    Chat.belongsToMany(models.User, { through: 'user-chat' })
    Chat.hasMany(models.Message)
  }
  return Chat
}
