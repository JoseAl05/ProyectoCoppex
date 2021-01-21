const Empresa = require("../models").empresa;

module.exports = {
    createCompany(req,res){
        return Empresa
            .create({
                nombreEmpresa : req.body.nombreEmpresa
            })
            .then(empresa => {
                res.status(200).json({empresa : empresa});
            })
            .catch(error => {
                res.status(500).send({message:error.message});
            })
    },
    getAllBusiness(req,res){
        return Empresa
            .findAll()
            .then(empresa => {
                res.json(empresa);
            })
            .catch(error => {
                res.status(500).send({message:error.message});
            })

    },
    getACompany(req,res){
        return Empresa
            .findAll({
                where:{
                    idEmpresa:req.params.idEmpresa
                }
            })
            .then(empresa => {
                res.json(empresa);
            })
            .catch(err => {
                res.status(500).send({message:err.message});
            })
    },
    deleteCompany(req,res){
        return Empresa
            .destroy({
                where:{
                    idEmpresa:req.params.idEmpresa
                }
            })
            .then(empresaDeleted =>{
                res.json(empresaDeleted);
            })
            .catch(err => {
                res.status(500).send({message:err.message})
            })
    },

    updateCompany(req,res){
        return Empresa
            .update(
            {
                nombreEmpresa:req.body.nombreEmpresa
            },
            {
                where:
                {
                    idEmpresa: req.params.idEmpresa
                }
            })
            .then(empresaUpdated => {
                res.status(200).json(empresaUpdated);
            })
            .catch(err => {
                res.send({message:err.message});
            })
    }
}