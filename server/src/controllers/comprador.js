const Comprador = require("../models").comprador;

module.exports = {
    createBuyer(req,res){
        return Comprador
            .create({
                nombreComprador : req.body.nombreComprador,
                emailComprador : req.body.emailComprador,
                telefonoComprador: req.body.telefonoComprador
            })
            .then(comprador => {
                res.status(200).json({comprador : comprador});
            })
            .catch(error => {
                res.status(500).send({message:error.message});
            })
    },
    getAllBuyers(req,res){
        return Comprador
            .findAll()
            .then(comprador => {
                res.json(comprador);
            })
            .catch(error => {
                res.status(500).send({message:error.message});
            })

    },
    deleteBuyer(req,res){
        return Comprador
            .destroy({
                where:{
                    idComprador:req.params.idComprador
                }
            })
            .then(compradorDeleted =>{
                res.json(compradorDeleted);
            })
            .catch(err => {
                res.status(500).send({message:err.message})
            })
    },

    updateBuyer(req,res){
        return Comprador
            .update(
            {
                nombreComprador:req.body.nombreComprador,
                emailComprador: req.body.emailComprador,
                telefonoComprador: req.body.telefonoComprador
            },
            {
                where:
                {
                    idComprador: req.params.idComprador
                }
            })
            .then(compradorUpdated => {
                res.status(200).json(compradorUpdated);
            })
            .catch(err => {
                res.send({message:err.message});
            })
    }
}