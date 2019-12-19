'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    return Promise.all([
      queryInterface.addColumn('Users', 'email', {
        type: Sequelize.STRING,
        unique: true
      }),
      queryInterface.addColumn('Users', 'password', {
        type: Sequelize.STRING
      })
    ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */

    return Promise.all([
      queryInterface.removeColumn('User', 'email'),
      queryInterface.removeColumn('User', 'password')
    ])
  }
};
