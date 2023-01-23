const Sequelize = require('sequelize');

const connection = new Sequelize('training-guiaPerguntas', 'root', 'XXXXXXXXXXX', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
