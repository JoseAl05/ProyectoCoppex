const router = require('express').Router();

const AdministradorController = require("../controllers/administrador");
const ClienteController = require("../controllers/cliente");
const UsuarioController = require("../controllers/usuario");
const CompradorController = require("../controllers/comprador");
const EmpresaController = require("../controllers/empresa");
const CotizacionController = require("../controllers/cotizacion");

const { verifySignup } = require("../middleware");
const AuthController = require("../controllers/authController");
const authorization = require("../middleware/authorization");
const authJwt  = require("../middleware/authJwt");


router.use(function(req,res,next){
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});


//** ADMINISTRADOR ROUTES**//
router.post('/admins/signup',[verifySignup.checkDuplicateNickname],AuthController.create);
router.post('/admins/signin',AuthController.login);
router.post('/admins/isVerify/:adminToken',authorization,async (req,res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get('/users/profile',authJwt.verifyToken,(req,res)=>{
    res.send(req.id);
})
router.get('/admins/getUsers',AdministradorController.getUsers);
router.post('/admins/getAUser',AdministradorController.getAUser);
router.put('/admins/updateUser/:idAdministrador',[verifySignup.checkDuplicateNickname],AdministradorController.updateUser);
router.delete('/admins/deleteUser/:id',AdministradorController.deleteUser);
router.post('/admins/getACotizante',AdministradorController.getACotizante);

//** CLIENTE ROUTES **//

router.post('/clients/addClient',ClienteController.createClient);
router.get('/clients/getClients',ClienteController.getAllClients);
router.get('/clients/idClient/:nombreCliente',ClienteController.getIdClient);
router.get('/clients/getAClient/:idCliente',ClienteController.getAClient);
router.delete('/clients/deleteClient/:idCliente',ClienteController.deleteClient);
router.put('/clients/updateClient/:idCliente',ClienteController.updateCliente);

//** USUARIO ROUTES **/

router.post('/users/addUser',UsuarioController.createUser);
router.get('/users/getUsers',UsuarioController.getAllUsers);
router.get('/users/getAUser/:idUsuario',UsuarioController.getAUser);
router.delete('/users/deleteUser/:idUsuario',UsuarioController.deleteUser);
router.put('/users/updateClient/:idUsuario',UsuarioController.updateUser);

//** COMPRADOR ROUTES **//

router.post('/buyers/addBuyer',CompradorController.createBuyer);
router.get('/buyers/getBuyers',CompradorController.getAllBuyers);
router.get('/buyers/getABuyer/:idComprador',CompradorController.getABuyer);
router.delete('/buyers/deleteBuyer/:idComprador',CompradorController.deleteBuyer);
router.put('/buyers/updateBuyer/:idComprador',CompradorController.updateBuyer);

//** EMPRESA ROUTES **//

router.post('/business/addCompany',EmpresaController.createCompany);
router.get('/business/getBusiness',EmpresaController.getAllBusiness);
router.get('/business/getACompany/:idEmpresa',EmpresaController.getACompany);
router.delete('/business/deleteCompany/:idEmpresa',EmpresaController.deleteCompany);
router.put('/business/updateCompany/:idEmpresa',EmpresaController.updateCompany);

//** COTIZACION ROUTES **//

router.post('/cotizaciones/addCotizacion',CotizacionController.createCotizacion);
router.get('/cotizaciones/getCotizaciones',CotizacionController.getAllCotizaciones);
router.delete('/cotizaciones/deleteCotizacion/:idCotizacion',CotizacionController.deleteCotizacion);
router.put('/cotizaciones/updateCotizacion/:idCotizacion',CotizacionController.updateCotizacion);

module.exports = router;

