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

      console.log(users)

      return queryInterface.bulkInsert('Messages', [{
        userId: users[0].id,
        chatId: chats[0].id,
        text: 'this is a test message',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userId: users[1].id,
        chatId: chats[0].id,
        text: 'this is a second message',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        userId: users[1].id,
        chatId: chats[0].id,
        text: 'this is a third message',
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
    return queryInterface.bulkDelete('Messages', null, {})
  }
};
