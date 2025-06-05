const {EquipType} = require('../entities');

async function getTypes() {
    
    try {
        
        const types = await EquipType.findAll();
        if (types.length === 0) {
            console.log('No hay Tipos en la base de datos');
        }
        
        return types;

    } catch (error) {
        throw error;
    }

}

async function createTypes(datos) {
    
    const {nombre} = datos;

    try {
        
        const type = await EquipType.create({
            nombre
        });

        if (!type) {
            console.log('No puedes crea un tipo Vacio');
        }

        return type;
    } catch (error) {
        throw error;
    }

}

async function updateTypes(id, datos) {
    
    try {
        
        const type = await EquipType.findByPk(id);
        if (!type) {
            console.log(`El Tipo de Equipo con Id ${id} No existe`);
            return null;
        }

        await type.update(datos);
        return type;

    } catch (error) {
        throw error;
    }

}

async function deleteTypes(id) {
    try {
        
        const type = await EquipType.findByPk(id);
        if (!type) {
            console.log(`No existe un tipo con Id ${id} En la base de datos`);
            return null;
        }

        await type.destroy();
        console.log(`El tipo de equipo con Id ${id} ha sido eliminado`);
    } catch (error) {
        
    }
}

module.exports = {
    getTypes,
    createTypes,
    updateTypes,
    deleteTypes
}