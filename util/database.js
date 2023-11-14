const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-schema','root','My-mysql05',{dialect:'mysql',host:'localhost'})

module.exports = sequelize;