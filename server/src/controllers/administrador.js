const Administrador = require("../models").administrador;

module.exports = {
    getUsers(req,res){
        return Administrador
            .findAll()
            .then(user => {
                res.json(user);
            })
            .catch(err => {
                res.status(500).send({message:err.message});
            });
    },
    getAUser(req,res){
        return Administrador
            .findAll({
                where:{
                    id:req.body.id
                }
            })
            .then(user => {
                res.json(user);
            })
            .catch(error => {
                res.status(400).send({message: error.message});
            });
    },
    updateUser(req,res){
        return Administrador
            .update(
            {
                username:req.body.username
            },
            {
                where:
                {
                    idAdministrador:req.params.idAdministrador
                }
            })
            .then(userUpdated => {
                res.status(200).json(userUpdated);
            })
            .catch(error => {
                res.status(500).send({message:error.message})
            })
    },
    deleteUser(req,res){
        return Administrador
            .destroy({
                where:{
                    id:req.params.id
                }
            })
            .then(userDeleted => {
                res.json(userDeleted);
            })
            .catch(err => {
                res.status(500).send(err);
            });
    },

    getACotizante(req,res){
        return Administrador
            .findAll({
                where:{
                    idAdministrador:req.body.idAdministrador
                },
                attributes: ['username']
            })
            .then(cotizante => {
                res.json(cotizante);
            })
            .catch(err =>  {
                res.status(500).send({message:err.message});
            })
    }

}