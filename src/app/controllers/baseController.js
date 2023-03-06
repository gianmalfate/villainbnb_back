// base controller

// importacoes
const express = require('express');
const authMiddleware = require('../middlewares/auth'); // autenticacao

const Base = require('../models/bases'); // import do base schema

const router = express.Router(); // rota

router.use(authMiddleware); // uso da autenticacao


// CRUD

// criar(post)
router.post('/', async(req, res) => {
    const { title, facadeName, city, techs } = req.body; // recebe parametros

    try {
        // erro title repetido
        if(await Base.findOne({ title }))
            return res.status(400).send({ error: 'Base title already exists' });

        const base = await Base.create({ title, facadeName, city, techs, user: req.userId }); // cria nova base

        await base.save(); // salva nova base

        return res.send({ base }); // retorna base
    } catch(err) {
        return res.status(400).send({ error: 'Error creating new base' }); // erro default
    }
});

// atualizar(put)
router.put('/:baseId', async(req, res) => {
    const { title, facadeName, city, techs } = req.body; // recebe parametros

    try {
        const base = await Base.findByIdAndUpdate(req.params.baseId, { // atualiza informacoes da base buscad pelo id
            title,
            facadeName,
            city,
            techs
        }, { new: true });

        await base.save(); // salva base novamente com as novas informacoes

        return res.send({ base }); // retorna base
    } catch(err) {
        return res.status(400).send({ error: 'Error updating base' }); // erro default
    }
});

// listar(get)
router.get('/', async(req, res) => {
    try {
        const bases = await Base.find().populate('user'); // lista todas as bases existentes e os users que as criaram

        return res.send({ bases }); // retorna bases
    } catch(err) {
        return res.status(400).send({ error: 'Error listing bases' }); // erro default
    }
});

//consultar(get)
router.get('/:baseId', async(req, res) => {
    try {
        const base = await Base.findById(req.params.baseId).populate('user'); // busca base pelo seu id e o user que a criou

        return res.send({ base }); // retorna base
    } catch(err) {
        return res.status(400).send({ error: 'Error searching base' }); // erro default
    }
});

// remover(delete)
router.delete('/:baseId', async(req, res) => {
    try {
        await Base.findByIdAndRemove(req.params.baseId); // remove base pelo seu id

        return res.send(); // retorno
    } catch(err) {
        return res.status(400).send({ error: 'Error deleting base' }); // erro default
    }
});


module.exports = app => app.use('/bases', router); // configura uso da rota '/auth'