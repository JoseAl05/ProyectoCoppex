'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cotizacion', {
      idCotizacion: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idAdministrador:{
        allowNull:false,
        type: Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'administrador',
          key:'idAdministrador'
        }
      },
      idCliente:{
        allowNull:false,
        type:Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references:{
          model:'cliente',
          key:'idCliente'
        }
      },
      idEmpresa:{
        allowNull:false,
        type:Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'empresa',
          key:'idEmpresa'
        }
      },
      idComprador:{
        allowNull:false,
        type:Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'comprador',
          key:'idComprador'
        }
      },
      idUsuario:{
        allowNull:false,
        type:Sequelize.INTEGER,
        onDelete:'CASCADE',
        references:{
          model:'usuario',
          key:'idUsuario'
        }
      },
      nombreEquipo : {
        type: Sequelize.STRING
      },
      numeroDeParte: {
        type: Sequelize.STRING
      },
      numeroDeLicitacion:{
        type: Sequelize.STRING
      },
      fechaRecepcion: {
        type: Sequelize.DATE
      },
      numeroCotizacionRepresentada: {
        type: Sequelize.STRING
      },
      divisa: {
        type: Sequelize.STRING
      },
      montoComisionCoppex: {
        type: Sequelize.FLOAT
      },
      condicionEntrega: {
        type: Sequelize.STRING
      },
      plazo: {
        type: Sequelize.STRING
      },
      numeroOrden: {
        type: Sequelize.STRING
      },
      fechaEmision: {
        type: Sequelize.DATE
      },
      fechaEntrega: {
        type: Sequelize.DATE
      },
      estadoCotizacion: {
        type: Sequelize.STRING
      },
      seguimiento: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cotizacion');
  }
};