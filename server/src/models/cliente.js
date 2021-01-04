'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cliente extends Model {
    static associate(models) {
    }
  };
  cliente.init({
    idCliente:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true
    },
    nombreCliente: DataTypes.STRING,
    pais: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cliente',
    freezeTableName:true
  });

  cliente.associate = models =>{
    cliente.hasMany(models.cotizacion,{
      foreignKey:'idCliente',
      as:'cotizacion',
      onDelete:'CASCADE'
    })
  }
  return cliente;
};