const {State} = require('../entities');

async function obtenerStates() {
    
    try {
        
        const state = await State.findAll();

        if (state.length === 0) {
            console.log('No se encuentra ningun elemento de tipo Estado');
        }

        return state;

    } catch (error) {
        throw error;
    }
}

async function crearStates(datos) {
    
    const {nombre} = datos

    try {
        
        const state = await State.create({
            nombre
        });

        return state;

    } catch (error) {
        throw error;
    }

}

async function editState(id, datos) {
    

    try {
        
        const state = await State.findByPk(id);
        if (!state) {
            console.log('No existe un Estado con ese Id');
            return null;
        }

        state.update(datos);
        return state;

    } catch (error) {
        throw error;
    }

}

async function deleteState(id) {
    
    try {
        const stateS = await State.findByPk(id)
        
        if (!stateS) {
            console.log('Eso no existe bro');
            return null;
        }

        await stateS.destroy();
        return console.log('Estado Eliminado Correctamente');
    } catch (error) {
        throw error;
    }

}

module.exports = {
    obtenerStates,
    crearStates,
    editState,
    deleteState
}