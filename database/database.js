const Sequelize = require('sequelize');

const connection = new Sequelize('training-guiaPerguntas', 'root', 'Trivo!cdc@1.sap', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;
