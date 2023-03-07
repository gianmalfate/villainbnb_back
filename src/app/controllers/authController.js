// user/autenticacao controller

// importacoes
const express = require('express');
const bcrypt = require('bcryptjs'); // incripta
const jwt = require('jsonwebtoken'); // token

const authConfig = require('../../config/auth.json') // autenticacao

const User = require('../models/user'); // import do user schema

const router = express.Router(); // rota


// funcao que gera o token do usuario
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400, // expira em um dia
    });
}


// ações

// registrar(post)
router.post('/register', async(req, res) => {
    const { email } = req.body; // recebe parametro

    try {
        // erro email repetido
        if(await User.findOne({ email }))
            return res.status(400).send({ error: 'User already exists' });

        const user = await User.create(req.body); // cria user

        user.password = undefined; // esconde password

        return res.send({ // retorna user e token cadastrado
            user,
            token: generateToken({ id: user.id })
        });
    } catch(err) {
        return res.status(400).send({ error: 'Registration failed' }); // erro default
    }
});

// autenticar(post)
router.post('/authenticate', async(req, res) => {
    const { email, password } = req.body; // recebe parametros

    const user = await User.findOne({ email }).select('+password'); // procura user pelo email e confere se a senha passada é a correta

    if(!user)
        return res.status(400).send({ error: 'User not found' }); // erro user inexistente

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Invalid password' }); // erro senha errada

    user.password = undefined; // esconde password

    return res.send({ // retorna user e token cadastrado
        user,
        token: generateToken({ id: user.id })
    });
});


module.exports = app => app.use('/auth', router); // configura uso da rota '/auth'