const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");

function authJwt(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ erro: "Token não fornecido" });
    }

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.substring(7)
        : authHeader;

    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ erro: "Token inválido" });
        }

        req.usuarioId = decoded.id;
        next();
    });
}

module.exports = authJwt;
