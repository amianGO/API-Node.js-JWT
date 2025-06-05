const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

/**
 * @param {import('sequelize').Sequelize} sequelize
 */


module.exports = (sequelize) => {

    class Rol extends Model { }

    Rol.init({
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Rol',
        tableName: 'roles',
        timestamps: false
    }
    )
    return Rol;
}



