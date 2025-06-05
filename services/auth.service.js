const bcrypt = require('bcrypt');
const {Usuario, Rol} = require('../entities');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function Login(email, password) {
    try {
        
        const usuario = await Usuario.findOne({
            where: {email},
            include: {model: Rol, as: 'rol', attributes: ['nombre']}
        });

        if (!usuario) {
            throw new Error ('Usuario no Encontrado')
        }

        const match = await bcrypt.compare(password, usuario.password);
        if (!match) {
            throw new Error('Contraseña Incorrecta');
        }

        const payload = {
            id: usuario.id,
            email: usuario.email,
            rol: usuario.rol.nombre
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        return {token, usuario: payload};
    } catch (error) {
        throw error;
    }
}

module.exports = {Login};