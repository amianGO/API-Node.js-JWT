const express = require('express');
const router = express.Router();
const { getTypes,
    createTypes,
    updateTypes,
    deleteTypes } = require('../services/equipTypes.service');
const {verifyToken} = require('../middlewares/auth.middlewares');
const {authorizeRoles} = require('../middlewares/role.middleware');

router.get('/types', verifyToken, authorizeRoles('admin'), async (req, res) => {

    try {

        const types = await getTypes();

        if (types.length === 0) {
            res.status(404).json({ message: 'No existen usuarios en la base de datos' });
        }

        res.status(200).json({ types });

    } catch (error) {
        res.status(500).json({ message: 'Error al traer todos los equipos de la base de dato', detalle: error.message });
    }
});

router.post('/types', verifyToken, authorizeRoles('admin'), async (req, res) => {

    const datos = req.body;

    try {

        const type = await createTypes(datos);

        if (!type) {
            res.status(400).json({ message: "No puedes crear un Tipo Vacio" })
        }

        res.status(201).json({ message: 'Tipo de Equipo creado', type });

    } catch (error) {
        res.status(500).json({ message: 'Error al crear un Tipo de Equipo', detalle: error.message });
    }
});

router.put('/types/:id', verifyToken, authorizeRoles('admin'), async (req, res) => {
    const { id } = req.params;
    const datos = req.body;

    try {

        const type = await updateTypes(id, datos);
        if (type === null) {
            res.status(404).json({ message: `No se encuentra el Tipo de equipo con Id ${id} en la base de datos` });
        }

        res.status(200).json({ message: `El tipo de equipo con Id ${id} Fue actualizado`, type });
    } catch (error) {
        res.status(500).json({ message: 'Error al Actaulizar el Tipo de equipo', detalle: error.message });
    }
});

router.delete('/types/:id', verifyToken, authorizeRoles('admin'), async (req, res) => {
    const { id } = req.params;

    try {

        const type = await deleteTypes(id);

        if (type === null) {
            res.status(404).json({ message: `El tipo de equipo con Id ${id} no existe` });
        }

        res.status(200).json({ message: `El Tipo de equipo con Id ${id} ha sido eliminado con exito` });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el Tipo de equipo", detalle: error.message });
    }
})

module.exports = router;