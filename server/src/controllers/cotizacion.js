const Cotizacion = require("../models").cotizacion;

module.exports = {
    createCotizacion(req,res) {
        return Cotizacion
            .create({
                idAdministrador : req.body.idAdministrador,
                idCliente : req.body.idCliente,
                idEmpresa: req.body.idEmpresa,
                idComprador: req.body.idComprador,
                idUsuario : req.body.idUsuario,
                nombreEquipo : req.body.nombreEquipo,
                numeroDeParte: req.body.numeroDeParte,
                numeroLicitacion : req.body.numeroLicitacion,
                fechaRecepcion: req.body.fechaRecepcion,
                numeroCotizacionRepresentada: req.body.numeroCotizacionRepresentada,
                divisa : req.body.divisa,
                montoComisionCoppex : req.body.montoComisionCoppex,
                condicionEntrega: req.body.condicionEntrega,
                plazo : req.body.plazo,
                numeroOrden: req.body.numeroOrden,
                fechaEmision: req.body.fechaEmision,
                fechaEntrega : req.body.fechaEntrega,
                estadoCotizacion: req.body.estadoCotizacion,
                seguimiento: req.body.seguimiento
            })
            .then(cotizacion => {
                res.status(200).json({cotizacion:cotizacion});
            })
            .catch(err => {
                res.status(500).send({message:err.message});
            })
    },
    getAllCotizaciones(req,res){
        return Cotizacion
            .findAll()
            .then(cotizacion => {
                res.json(cotizacion);
            })
            .catch(err => {
                res.status(500).send({message:err.message});
            })
    },
    deleteCotizacion(req,res){
        return Cotizacion
            .destroy({
                where:{
                    idCotizacion : req.params.idCotizacion
                }
            })
            .then(cotizacionDeleted => {
                res.status(200).json(cotizacionDeleted);
            })
            .catch(err => {
                res.status(500).send({message:err.message});
            })
    },
    updateCotizacion(req,res){
        return Cotizacion
            .update(
                {
                    numeroDeParte: req.body.numeroDeParte,
                    fechaRecepcion: req.body.fechaRecepcion,
                    numeroCotizacionRepresentada: req.body.numeroCotizacionRepresentada,
                    divisa : req.body.divisa,
                    montoComisionCoppex : req.body.montoComisionCoppex,
                    condicionEntrega: req.body.condicionEntrega,
                    plazo : req.body.plazo,
                    numeroOrden: req.body.numeroOrden,
                    fechaEmision: req.body.fechaEmision,
                    fechaEntrega : req.body.fechaEntrega,
                    estadoCotizacion: req.body.estadoCotizacion,
                    seguimiento: req.body.seguimiento
                },
                {
                    where:
                    {
                        idCotizacion : req.params.idCotizacion
                    }
                }
            )
            .then(cotizacionUpdated => {
                res.status(200).json(cotizacionUpdated);
            })
            .catch(err => {
                res.status(500).send({message:err.message});
            })
    }
}