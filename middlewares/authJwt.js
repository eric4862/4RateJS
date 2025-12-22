const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ mensagem: 'Token não fornecido' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = jwt.verify(token, jwtConfig.secret);
        req.usuarioId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
    }
};
