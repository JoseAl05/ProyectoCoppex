'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comprador extends Model {

    static associate(models) {
    }
  };
  comprador.init({
    idComprador:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    nombreComprador: DataTypes.STRING,
    emailComprador: DataTypes.STRING,
    telefonoComprador: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'comprador',
    freezeTableName:true
  });

  comprador.associate = models =>{
    comprador.hasMany(models.cotizacion,{
      foreignKey:'idComprador',
      as:'cotizacion',
      onDelete:'CASCADE'
    })
  }
  return comprador;
};