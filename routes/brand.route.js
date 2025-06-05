const express = require('express');
const router = express.Router();
const { getBrands,
    createBrand,
    updateBrand,
    deleteBrand } = require('../services/brand.service');
const {verifyToken} = require('../middlewares/auth.middlewares');
const {authorizeRoles} = require('../middlewares/role.middleware');

router.get('/brand',verifyToken, authorizeRoles('admin'), async (req, res) => {

    try {

        const brands = await getBrands();

        if (brands.length === 0) {
            res.status(404).json({ messagge: 'No se Encuentran Marcas en la base de datos' });
        }

        res.status(200).json({ brands });

    } catch (error) {
        res.status(500).json({ message: 'Error al Buscar las Marcas', detalle: error.message });
    }

});

router.post('/brand', verifyToken, authorizeRoles('admin'), async (req, res) => {

    const datos = req.body;

    try {

        const newBrand = await createBrand(datos);
        res.status(200).json({ message: 'Marca creada correctamente', newBrand });

    } catch (error) {
        res.status(500).json({ message: 'Error al crear al crear la marcar', detalle: error.message });
    }
});

router.put('/brand/:id', verifyToken, authorizeRoles('admin'), async (req, res) => {

    const { id } = req.params;
    const datos = req.body;

    try {

        const brand = await updateBrand(id, datos);

        if (!brand) {
            res.status(404).json({ message: `La marca con Id ${id} No se encuentra en la Base de datos` });
        }

        res.status(200).json({ message: 'Marca actualizada correctamente', brand });

    } catch (error) {
        res.status(500).json({ message: 'Error al Editar la marca', detalle: error.message })
    }

});

router.delete('/brand/:id', verifyToken, authorizeRoles('admin'), async (req, res) => {

    const { id } = req.params;

    try {

        const destroyBrand = await deleteBrand(id);
        if (destroyBrand === null) {
            res.status(404).json({ message: `La marca con Id ${id} No existe` });
        }

        res.status(200).json({ message: 'La marca ha sido eliminada' })

    } catch (error) {
        res.status(500).json({ message: 'Error al Borrar la Marca', detalle: error.message });
    }
})

module.exports = router;