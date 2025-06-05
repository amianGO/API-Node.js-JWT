const bcrypt = require('bcrypt');
const {Usuario, Rol} = require('../entities')

async function crearUsuario(datosUsuario) {
    
    try {
        
        const {nombre, email, password, role_id} = datosUsuario;

        //Encriptar Contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Crear el Usuario
        const nuevoUsuario = await Usuario.create({
            nombre,
            email,
            password: hashedPassword,
            role_id
        });

        return nuevoUsuario;

    } catch (error) {
        throw error;
    }

}

async function obtenerUsuarios() {
    try {
        const user = await Usuario.findAll({
            include: {
                model: Rol,
                as:'rol',
                attributes: ['nombre']
            },
            attributes: {
                exclude: ['role_id', 'password']
            }
        });
        if (user.length === 0) {
            console.log('La base de datos esta vacia Bro :c')
        }
        return user;
    } catch (error) {
        throw error;
    }
}

async function updateUser(id, datosUsuario) {
    
    try {
        
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            console.log('El Usuario no Existe')
            return null;
        }

        //Encriptar Contraseña
        if (datosUsuario.password) {
            const salt = await bcrypt.genSalt(10);
            datosUsuario.password = await bcrypt.hash(datosUsuario.password, salt);
        }

        //Actualizar los Campos
        await usuario.update(datosUsuario);
        return usuario;

    } catch (error) {
        throw error;
    }
}

async function deleteUser(id) {
        
    try {
        const usuario = await Usuario.findByPk(id);
        
        if (!usuario) {
            console.log('No puedo eliminar algo que no existe');
            return null;
        }
        await usuario.destroy();
        console.log(`Usuario con ${id} Eliminado`);
    } catch (error) {
        throw error;
    }

}

module.exports = {crearUsuario,obtenerUsuarios, updateUser, deleteUser};