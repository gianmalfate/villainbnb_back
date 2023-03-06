// autenticacao

// importacoes
const jwt = require('jsonwebtoken'); // permite uso de tokens de autenticacao e acesso
const authConfig = require('../../config/auth.json'); // hash usado


// modulo de autenticacao
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // pre verificacoes - simples
    if(!authHeader)
        return res.status(401).send({ error: 'No token provided' }); // erro token inexistente

    const parts = authHeader.split(' '); // separa leitura do token em duas partes "Bearer 217g21rbfn83y82he8n"

    if(!parts.length === 2)
        return res.status(401).send({ error: 'Token error' }); // erro token nao "separado"

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token malformatted' }); // erro token mal formatado (sem o "Bearer")


    // verificacao robusta principal
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err)
            return res.status(401).send({ error: 'Token invalid' }); // erro token invalido, mas que segue o padrao

        req.userId = decoded.id;
        return next();
    });
};