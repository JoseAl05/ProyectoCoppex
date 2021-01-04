'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class administrador extends Model {
    static associate(models) {
    }
  };
  administrador.init({
    idAdministrador:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'administrador',
    freezeTableName: true
  });

  administrador.associate = models => {
    administrador.hasMany(models.cotizacion, {
      foreignKey:'idAdministrador',
      as:'cotizacion',
      onDelete:'CASCADE'
    })
  }
  return administrador;
};