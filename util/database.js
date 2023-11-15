const Sequelize = require('sequelize');
const sequelize = new Sequelize('node_schema','root','My-mysql05',{dialect:'mysql',host:'127.0.0.1'})

module.exports = sequelize;