const Usuario = require("../models").usuario;

module.exports = {
    createUser(req,res){
        return Usuario
            .create({
                nombreUsuario : req.body.nombreUsuario,
                emailUsuario : req.body.emailUsuario,
                telefonoUsuario: req.body.telefonoUsuario
            })
            .then(usuario => {
                res.status(200).json({usuario : usuario});
            })
            .catch(error => {
                res.status(500).send({message:error.message});
            })
    },
    getAllUsers(req,res){
        return Usuario
            .findAll()
            .then(usuario => {
                res.json(usuario);
            })
            .catch(error => {
                res.status(500).send({message:error.message});
            })

    },
    deleteUser(req,res){
        return Usuario
            .destroy({
                where:{
                    idUsuario:req.params.idUsuario
                }
            })
            .then(usuarioDeleted =>{
                res.json(usuarioDeleted);
            })
            .catch(err => {
                res.status(500).send({message:err.message})
            })
    },

    updateUser(req,res){
        return Usuario
            .update(
            {
                nombreUsuario:req.body.nombreUsuario,
                emailUsuario: req.body.emailUsuario,
                telefonoUsuario: req.body.telefonoUsuario
            },
            {
                where:
                {
                    idUsuario: req.params.idUsuario
                }
            })
            .then(userUpdated => {
                res.status(200).json(userUpdated);
            })
            .catch(err => {
                res.send({message:err.message});
            })
    }
}