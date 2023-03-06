//user schema

// importacoes
const mongoose = require('../../database/index');
const bcrypt = require('bcryptjs'); // permite incriptacao


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true // obrigatorio
    },
    email: {
        type: String,
        unique: true, // unico
        require: true,
        lowercase: true // forca caixa baixa
    },
    password: {
        type: String,
        require: true,
        select: false // esconde informacao - "confidencial"
    },
    createdAt: { // data de cadastro do user
        type: Date,
        default: Date.now
    }
});


// funcao que incripta a senha do user com um hash
UserSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
});


const User = mongoose.model('User', UserSchema); // modelo

module.exports = User; // exporta user