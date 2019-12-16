'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const usersAndChats = Promise.all([
      queryInterface.sequelize.query('SELECT id from Users;'),
      queryInterface.sequelize.query('SELECT id from Chats;')
    ])

    return usersAndChats.then(rows => {
      const users = rows[0][0]
      const chats = rows[1][0]
      console.log(chats)
      return queryInterface.bulkInsert('user-chat', [{
        userId: users[0].id,
        chatId: chats[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userId: users[1].id,
        chatId: chats[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('user-chat', null, {})
  }
};
