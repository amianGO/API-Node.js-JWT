const express = require('express');
const router = express.Router();
const {obtenerStates,crearStates,deleteState,editState} = require('../services/state.service');
const {verifyToken} = require('../middlewares/auth.middlewares');
const {authorizeRoles} = require('../middlewares/role.middleware');

router.get('/state', verifyToken, authorizeRoles('admin'), async (req, res) => {
    
    try {
        
        const states = await obtenerStates();
        if (states.length === 0) {
            res.status(404).json({message: 'No se han encontrado marcas en la base de datos'});
        }

        res.status(200).json({states});

    } catch (error) {
        res.status(500).json({message: 'Error al Traer los estados', detalle: error.message});
    }

});

router.post('/state', verifyToken, authorizeRoles('admin'), async (req, res) => {
    
    const dato = req.body;

    try {
        
        const stateCreate = await crearStates(dato);
        res.status(201).json(stateCreate);

    } catch (error) {
        res.status(500).json({message: 'Error al crear un estado', detalle: error.message});
    }

});

router.put('/state/:id', verifyToken, authorizeRoles('admin'), async (req, res) => {
    
    const {id} = req.params;
    const datos = req.body;

    try {
        
        const updateState = await editState(id,datos);
        if (!updateState) {
            res.status(404).json({message: `El estado con el Id ${id} no se encuentra`});
        }

        res.status(200).json(updateState);

    } catch (error) {
        res.status(500).json({message: 'Error al Actualizar el Estado', detalle: error.message});
    }

});

router.delete('/state/:id', verifyToken, authorizeRoles('admin'), async (req, res) => {
    
    const {id} = req.params;

    try {
        
        const deleted = await deleteState(id);

        if (deleted === null) {
            return res.status(404).json({message: `El Id ${id} No existe en la base de datos`}); 
        }

        return res.status(200).json({message: 'Estado Eliminado con Exito'});

    } catch (error) {
        res.status(500).json({message: 'Error al eliminar el Estado', detalle: error.message});        
    }
});

module.exports = router;
