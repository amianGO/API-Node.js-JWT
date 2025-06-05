const express = require('express');
const router = express.Router();
const {crearUsuario, obtenerUsuarios, updateUser, deleteUser} = require('../services/user.service');
const {verifyToken} = require('../middlewares/auth.middlewares');
const {authorizeRoles} = require('../middlewares/role.middleware');

router.post('/usuarios', verifyToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const nuevoUsuario = await crearUsuario(req.body);
        res.status(201).json(nuevoUsuario);

    } catch (error) {
        res.status(500).json({error: 'Error al crear el usuario', detalle: error.message});
    }
});

router.get('/usuarios', verifyToken, authorizeRoles('admin'), async (req, res) => {
    try {
        const usuarios = await obtenerUsuarios();
        if (usuarios.length === 0) {
            res.json({message: 'La base de datos esta vacia :C'})
        }
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({error: 'Error al mostrar los usuarios de la Db', detalle: error.message});
    }
});

router.put('/usuarios/:id', verifyToken, authorizeRoles('admin'), async (req, res) => {
    
    const {id} = req.params;

    try {
        
        const userUpdate = await updateUser(id, req.body);

        if (!userUpdate) {
            return res.status(404).json({message: 'Usuario no Encontrado'});
        }

        res.status(200).json(userUpdate);
    } catch (error) {
        res.status(500).json({error: 'Error al actualizar el usuario', detalle: error.message});
    }
});

router.delete('/usuarios/:id', verifyToken, authorizeRoles('admin'), async (req, res) => {
    
    const {id} = req.params;
    
    try {
        
        const userDelete = await deleteUser(id);
        if (userDelete) {
            return res.status(404).json({message: 'No se encuentra el usuario a eliminar'});
        } else {
            res.status(200).json({message: 'El usuario ha sido eliminado'});

        }

    } catch (error) {
        res.status(500).json({error: 'Error al eliminar el usuario', detalle: error.message});
    }

})

module.exports = router;