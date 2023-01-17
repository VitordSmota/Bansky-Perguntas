const Sequelize = require('sequelize');
const connection = require('./database');

const Resposta = connection.define('resposta', {
    resposta: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    IDpergunta: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});
Resposta.sync({ force: false }).then(() => {
    console.log('OK-Tabela Resposta criada e funcionando.');   
});
module.exports = Resposta;