const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');



module.exports = (sequelize) => {
    class EquipType extends Model {}
    EquipType.init({
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {sequelize,
        modelName: 'EquipType',
        tableName: 'equiptypes',
        timestamps: false
    })
    return EquipType;
}
