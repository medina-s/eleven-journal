const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:7e25e8f853ec49268d88b860388fd0dc@localhost:5432/eleven-journal");

module.exports = sequelize;