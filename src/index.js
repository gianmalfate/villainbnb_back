// main

// pacotes
const express = require('express'); // camada construída no topo do node que ajuda a gerenciar servidores e rotas
const bodyParser = require('body-parser'); // permite acessar o body da requisicao HTTP (req)


const app = express(); // cria aplicação (core)

app.use(bodyParser.json()); // envio de requisicoes pra API em json
app.use(bodyParser.urlencoded({ extended: false })); // passagem de parametros via url

require('./app/controllers/index')(app); // objeto app repassado para todos os controllers criados

app.listen(3000); // porta