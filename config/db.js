const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('soft_secure','root','',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;