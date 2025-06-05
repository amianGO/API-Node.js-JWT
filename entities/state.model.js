const {DataTypes, Model} = require('sequelize');
const sequelize = require('../config/db');
 /**
  * @param {import('sequelize').Sequelize} sequelize
  */

 module.exports = (sequelize) => {
    class State extends Model{}

    State.init({
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'State',
        tableName: 'estados',
        timestamps: false
    });
    return State;
}


