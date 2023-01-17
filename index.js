// call Express
const express = require('express');
const app = express();

// call bodyParser
const bodyParser = require('body-parser')

// call Database
const connection = require('./database/database');
connection.authenticate().then(() => {
    console.log('OK - conexão com banco');
}).catch((erromessage) => {
    console.log(erromessage);
})
const Pergunta = require('./database/Pergunta');
const Resposta = require('./database/Resposta');


// Express usando EJS para visualizar frontEnd.
app.set('view engine', 'ejs');
app.use(express.static('public'));
// bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Rotas
app.get('/', (req, res) => {

    Pergunta.findAll({
        raw: true,
        order:
            [
                ['id', 'DESC'],
            ]
    }).then(perguntas => {
        
        res.render('index', {
            perguntas: perguntas
        })
    });



});
app.get('/perguntar', (req, res) => {
    res.render('perguntar');
});
app.post('/salvarpergunta', (req, res) => {
    const titulo = req.body.titulo;
    const descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect('/');
    });
});
app.get("/pergunta/:id", (req, res) => {
  let id = req.params.id;
  Pergunta.findOne({
    where: { id: id }
  }).then(pergunta => {
    if (pergunta != undefined) {  
      Resposta.findAll({
        where: { IDpergunta: pergunta.id },
        order: [
          ['id', 'DESC']
        ]
      }).then((respostas) => {
        res.render('pergunta', {

          pergunta: pergunta,
          respostas: respostas

        });
        
      });
     
    } else {

      res.redirect('/');
    }
  });
  
  
});
app.post('/responder', (req, res) => {
  let resposta = req.body.resposta;
  let perguntaid = req.body.pergunta;
  Resposta.create({
    resposta: resposta,
    IDpergunta: perguntaid
  }).then(() => {
    res.redirect('/pergunta/' + perguntaid);
  });
});
app.listen(1212, () => {console.log('App rodando')});

