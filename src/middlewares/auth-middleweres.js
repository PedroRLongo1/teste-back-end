const jwt = require('jsonwebtoken'); //gera um token para manter o usuário logado

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    //valida o token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token de autenticação não fornecido ou inválido' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // compara o JWT_SECRET com a chave secreta
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token inválido ou expirado' });
    }
};

module.exports = authMiddleware;