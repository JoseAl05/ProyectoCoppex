'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuario extends Model {
    static associate(models) {
    }
  };
  usuario.init({
    idUsuario:{
      type:DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey:true
    },
    nombreUsuario: DataTypes.STRING,
    emailUsuario: DataTypes.STRING,
    telefonoUsuario: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usuario',
    freezeTableName:true
  });

  usuario.associate = models =>{
    usuario.hasMany(models.cotizacion,{
      foreignKey:'idUsuario',
      as:'cotizacion',
      onDelete:'CASCADE'
    })
  }
  return usuario;
};