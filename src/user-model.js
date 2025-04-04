const { DataTypes } = require('sequelize'); //faz o js interagir com o sqlite
const sequelize = require('../database'); //database

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;