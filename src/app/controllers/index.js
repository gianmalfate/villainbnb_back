// main controllers - chamada na index main para passar em conjunto todos os controllers criados

// importacoes
const fs = require('fs'); // file system do node
const path = require('path'); // caminhos de pasta

// modulo exportado que permite leitura e envio de todos os controllers para a API (index main)
module.exports = app => {
    fs
        .readdirSync(__dirname) // ler um dir (esse no caso)
        .filter(file => ((file.indexOf('.')) !== 0 && (file !== "index.js"))) // filtrar arquivos
        .forEach(file => require(path.resolve(__dirname, file))(app)); // percorrer arquivos e passar o app para cada um deles
};