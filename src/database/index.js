// main database

const mongoose = require('mongoose'); // pacote que o node utiliza para se conectar ao mongodb

mongoose.connect('mongodb://127.0.0.1/villainbnb'); // "url" de conexao ao banco mongodb "villainbnb"

// padroes para todo os projetos
mongoose.Promise = global.Promise;

module.exports = mongoose; // modulo exportado