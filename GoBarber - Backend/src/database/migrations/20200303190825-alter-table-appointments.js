module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('appointments', 'cancelled_at');

    return queryInterface.addColumn('appointments', 'cancelled_at', {
      type: Sequelize.DATE,
      allowNull: true
    });
  }
};
