'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  empresa.init({
    idEmpresa:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    nombreEmpresa: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'empresa',
    freezeTableName:true
  });

  empresa.associate = models =>{
    empresa.hasMany(models.cotizacion, {
      foreignKey:'idEmpresa',
      as:'cotizacion',
      onDelete:'CASCADE'
    })
  }
  return empresa;
};