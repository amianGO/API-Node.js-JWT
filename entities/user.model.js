const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db');

/**
 * @param {import('sequelize').Sequelize} sequelize
 */

module.exports = (sequelize) => {

    class Usuario extends Model { }

    Usuario.init({
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuarios',
        timestamps: false
    });
    return Usuario;
};
