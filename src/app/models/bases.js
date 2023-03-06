//base schema

// importacoes
const mongoose = require('../../database/index');


const BaseSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true, // bases com titulos iguais nao podem ser cadastradas
        require: true, // obrigatorio
    },
    facadeName: {
        type: String,
        require: true,
        select: false, // ao buscar as bases, os nomes das fachadas nao aparecerao - "confidencial"
    },
    city: {
        type: String,
        require: true,
    },
    techs: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    createdAt: { // data de cadastro da base
        type: Date,
        default: Date.now,
    }
});


const Base = mongoose.model('Base', BaseSchema); // modelo

module.exports = Base; // exportar o modelo