const { Inventory, EquipType, Brand, State } = require('../entities');

async function obtenerInventario() {

    try {

        const inventory = await Inventory.findAll({
            include: [
                {
                    model:  EquipType ,
                    as: 'equipType',
                    attributes: ['nombre']
                },
                {
                    model: Brand,
                    as: 'brand',
                    attributes: ['nombre']
                },
                {
                    model: State,
                    as: 'state',
                    attributes: ['nombre']
                }
            ], attributes: {
                exclude: ['equipType_id','brand_id', 'state_id']
            }

        });

        if (inventory.length === 0) {
            console.log('No existen objetos en el inventario');
        }

        return inventory;
    } catch (error) {
        throw error;
    }
}

async function createInventory(datos) {



    try {

        const { nombre, createdAt, updatedAt, equipType_id, brand_id, state_id } = datos;

        const newObject = await Inventory.create({
            nombre,
            createdAt,
            updatedAt,
            equipType_id,
            brand_id,
            state_id
        });


        return newObject;
    } catch (error) {
        throw error;
    }
}

async function updateInventory(id, datos) {

    try {

        const object = await Inventory.findByPk(id);
        if (!object) {
            console.log(`El objeto con Id ${id} No existe`);
            return null;
        }

        await object.update(datos);
        return object;
    } catch (error) {
        throw error;
    }
}

async function deleteInventory(id) {
    try {

        const object = await Inventory.findByPk(id);
        if (object === null) {
            console.log(`El Objeto con id ${id} No existe`);
            return null
        }

        await object.destroy();
        console.log(`El Objeto con id ${id} ha sido eliminado con exito`);
    } catch (error) {

    }
}

module.exports = {
    obtenerInventario,
    createInventory,
    updateInventory,
    deleteInventory
}