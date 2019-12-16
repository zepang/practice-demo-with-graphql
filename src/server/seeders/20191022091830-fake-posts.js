'use strict'

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
    return queryInterface.sequelize.query(
      'SELECT id from Users;'
    ).then(users => {
      const usersRows = users[0]
      console.log(users, usersRows)
      return queryInterface.bulkInsert('Posts', [{
        text: 'Lorem ipsum 2',
        userId: usersRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        text: 'Lorem ipsum 2',
        userId: usersRows[1].id,
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
    return queryInterface.bulkDelete('Posts', null, {})
  }
}
