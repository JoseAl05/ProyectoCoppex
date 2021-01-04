'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cotizacion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  cotizacion.init({
    idCotizacion:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    nombreEquipo: DataTypes.STRING,
    numeroDeParte: DataTypes.STRING,
    numeroDeLicitacion: DataTypes.STRING,
    fechaRecepcion: DataTypes.DATE,
    numeroCotizacionRepresentada: DataTypes.STRING,
    divisa: DataTypes.STRING,
    montoComisionCoppex: DataTypes.FLOAT,
    condicionEntrega: DataTypes.STRING,
    plazo: DataTypes.STRING,
    numeroOrden: DataTypes.STRING,
    fechaEmision: DataTypes.DATE,
    fechaEntrega: DataTypes.DATE,
    estadoCotizacion: {
      type: DataTypes.STRING,
      values: ['EN EVALUACION','CARTA EXCUSA','EN COTIZACION','PERDIDA','CERRADA','NO COTIZADA','ASIGNADA','ADJUDICADA']
    },
    seguimiento: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cotizacion',
    freezeTableName:true
  });

  cotizacion.associate = models =>{
    cotizacion.belongsTo(models.administrador, {
      foreignKey:'idAdministrador',
      as:'administrador',
      onDelete:'CASCADE'
    })
    
    cotizacion.belongsTo(models.cliente, {
      foreignKey:'idCliente',
      as:'cliente',
      onDelete:'CASCADE'
    })

    cotizacion.belongsTo(models.empresa, {
      foreignKey:'idEmpresa',
      as:'empresa',
      onDelete:'CASCADE'
    })

    cotizacion.belongsTo(models.comprador, {
      foreignKey:'idComprador',
      as:'comprador',
      onDelete:'CASCADE'
    })

    cotizacion.belongsTo(models.usuario, {
      foreignKey:'idUsuario',
      as:'usuario',
      onDelete:'CASCADE'
    })

  }

  return cotizacion;
};