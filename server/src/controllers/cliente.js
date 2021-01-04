const Cliente = require("../models").cliente;

module.exports = {
    createClient(req,res){
        return Cliente
            .create({
                nombreCliente : req.body.nombreCliente,
                pais : req.body.pais
            })
            .then(cliente => {
                res.status(200).json({cliente : cliente});
            })
            .catch(error => {
                res.status(500).send({message:error.message});
            })
    },
    getAllClients(req,res){
        return Cliente
            .findAll()
            .then(cliente => {
                res.json(cliente);
            })
            .catch(error => {
                res.status(500).send({message:error.message});
            })

    },
    getIdClient(req,res){
        return Cliente
            .findAll({
                where:{
                    nombreCliente : req.params.nombreCliente
                }
            })
            .then(client => {
                res.json(client);
            })
            .catch(err => {
                res.status(500).send({message:err.message});
            })
            
    },
    deleteClient(req,res){
        return Cliente
            .destroy({
                where:{
                    idCliente:req.params.idCliente
                }
            })
            .then(clientDeleted =>{
                res.json(clientDeleted);
            })
            .catch(err => {
                res.status(500).send({message:err.message})
            })
    },

    updateCliente(req,res){
        return Cliente
            .update(
            {
                nombreCliente:req.body.nombreCliente
            },
            {
                where:
                {
                    idCliente: req.params.idCliente
                }
            })
            .then(clientUpdated => {
                res.status(200).json(clientUpdated);
            })
            .catch(err => {
                res.send({message:err.message});
            })
    }
}