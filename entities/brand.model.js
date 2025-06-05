const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
/**
 * @param {import('sequelize').Sequelize} sequelize
 */


module.exports = (sequelize) => {
    class Brand extends Model { }

    Brand.init({

        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Brand',
        tableName: 'marcas',
        timestamps: false

    });

    return Brand;
}