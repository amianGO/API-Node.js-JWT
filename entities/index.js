const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/db');

//Importando la definicion de los modelos
const UserModel = require('./user.model');
const RolModel = require('./rol.model');
const InventoryModel = require('./inventory.model');
const EquipTypeModel = require('./equipTypes.model');
const BrandModel = require('./brand.model');
const StateModel = require('./state.model');

//Incializar Modelos
const Usuario = UserModel(sequelize);
const Rol = RolModel(sequelize);
const Inventory = InventoryModel(sequelize);
const EquipType = EquipTypeModel(sequelize);
const Brand = BrandModel(sequelize);
const State = StateModel(sequelize);

//Definir Relacion
Rol.hasMany(Usuario, {foreignKey: 'role_id'});
Usuario.belongsTo(Rol, {foreignKey: 'role_id', as: 'rol'});
Inventory.belongsTo(EquipType, {foreignKey: 'equipType_id', as: 'equipType'});
EquipType.hasMany(Inventory, {foreignKey: 'equipType_id'});
Inventory.belongsTo(Brand, {foreignKey: 'brand_id', as: 'brand'})
Brand.hasMany(Inventory, {foreignKey: 'brand_id'});
Inventory.belongsTo(State, {foreignKey: 'state_id', as: 'state'})
State.hasMany(Inventory,{foreignKey: 'state_id'})

module.exports = {Usuario, Rol , sequelize, Inventory, EquipType, Brand, State};