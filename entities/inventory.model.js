
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');


/**
 * @param {import ('sequelize').Sequelize} sequelize
 */

module.exports = (sequelize) => {
    class Inventory extends Model {}

    Inventory.init({
        

        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        equipType_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        brand_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        state_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, {
        sequelize,
        modelName: "inventory",
        tableName: 'inventory',
        timestamps: true
    });
    return Inventory;
}
