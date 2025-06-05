const express = require('express');
const router = express.Router();
const {obtenerInventario,createInventory,updateInventory, deleteInventory} = require('../services/inventory.service');
const {verifyToken} = require('../middlewares/auth.middlewares');
const {authorizeRoles} = require('../middlewares/role.middleware');

router.get('/inventory', verifyToken, authorizeRoles('admin', 'docente'), async (req, res) => {
    
    try {
        
        const inventory = await obtenerInventario();

        if (inventory.length === 0) {
            res.status(404).json({message: 'No Hay objetos en el inventario'});
        }

        res.status(200).json({message: 'Este es el inventario', inventory});
    } catch (error) {
        res.status(500).json({message: 'Error al traer el Inventario', detalle: error.message});
    }
});

router.post('/inventory', verifyToken, authorizeRoles('admin'), async (req, res) => {
    
    const datos = req.body;

    try {
        
        const object = await createInventory(datos);

        res.status(201).json({message: 'El Objeto ha sido creado correctamente', object});
    } catch (error) {
        res.status(500).json({message: 'Error al crear un Objeto', detalle: error.message});
    }
});

router.put('/inventory/:id',verifyToken,authorizeRoles('admin'), async (req, res) => {

    const {id} = req.params;
    const datos = req.body;

    try {
        
        const object = await updateInventory(id, datos);
        if (!object) {
            res.status(404).json({message: `El Objeto con Id ${id} No existe`});
        }

        res.status(200).json({message: `El objeto con Id ${id} ha sido actualizado`, object});
        
    } catch (error) {
        res.status(500).json({message: 'Error al actualizar el objeto', detalle: error.message});
    }
});

router.delete('/inventory/:id',verifyToken,authorizeRoles('admin'), async (req, res) => {
    
    const {id} = req.params;

    try {
        
        const object = await deleteInventory(id);
        if (object === null) {
            res.status(404).json({message: `El Objeto con Id ${id} No existe`});
        }

        res.status(200).json({message: `El Objeto con Id ${id} Ha sido eliminado`});
    } catch (error) {
        res.status(500).json({message: "Error al eliminar el Objeto", detalle: error.message});
    }
})

module.exports = router;