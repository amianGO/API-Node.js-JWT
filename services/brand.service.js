const {Brand} = require('../entities');

async function getBrands() {
    
    try {
        
        const brands = await Brand.findAll();

        if (brands.length === 0) {
            console.log('No Existe ninguna Marca en la base de datos');
        }

        return brands;

    } catch (error) {
        throw error;
    }
}

async function createBrand(datos) {

    const {nombre} = datos;

    try {
        
        const brand = await Brand.create({
            nombre
        });

        return brand;

    } catch (error) {
        throw error;
    }

}

async function updateBrand(id, datos) {
    
    try {
        
        const brand = await Brand.findByPk(id);
        if (!brand) {
            console.log(`La marca con Id ${id} No existe`);
            return null;
        }

        await brand.update(datos);

        return brand;

    } catch (error) {
        throw error;
    }

}

async function deleteBrand(id) {
    
    try {
        
        const brand = await Brand.findByPk(id);
        
        if (!brand) {
            console.log(`La marca a eliminar con Id ${id} No existe`);
            return null;
        }

        await brand.destroy();
        console.log(`la marca con Id ${id} ha sido eliminada`)
    } catch (error) {
        throw error;
    }

}

module.exports = {
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand
}