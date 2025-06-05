const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
    
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({message: 'El Token es Requerido'});

    try {
        const payload = jwt.verify(token.split(' ')[1],process.env.JWT_SECRET);
        req.user = payload; //Id, Email y Rol
        next();
    } catch (error) {
        return res.status(403).json({message: "Token Invalido o Expirado"})
    }
}

module.exports = {verifyToken};