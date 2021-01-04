const Sequelize = require("sequelize");
const AdministradorModel = require('./models').administrador;
const ClienteModel = require('./models').cliente;
const CompradorModel = require('./models').comprador;
const CotizacionModel = require('./models').cotizacion;
const EmpresaModel = require('./models').empresa;
const EquipoModel = require('./models').equipo;
const UsuarioModel = require('./models').usuario;


const sequelize = new Sequelize('angular','postgres','jpal0598',{
    host:'localhost',
    dialect: 'postgres'
});

sequelize.authenticate()
  .then(() => {
    console.log('Conectado')
  })
  .catch(err => {
    console.log('No se conecto')
  })

  const Administrador = new AdministradorModel(sequelize, Sequelize);
  const Cliente = new ClienteModel(sequelize, Sequelize);
  const Comprador = new CompradorModel(sequelize, Sequelize);
  const Cotizacion = new CotizacionModel(sequelize, Sequelize);
  const Empresa = new EmpresaModel(sequelize, Sequelize);
  const Equipo = new EquipoModel(sequelize, Sequelize);
  const Usuario = new UsuarioModel(sequelize, Sequelize);

  sequelize.sync({
      force: true
  })
  .then(() => {
      console.log("Sincronizated Tables")
  })

  module.exports = {
    Administrador,
    Cliente,
    Comprador,
    Cotizacion,
    Empresa,
    Equipo,
    Usuario
  }