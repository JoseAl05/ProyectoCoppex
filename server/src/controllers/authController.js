const Administrador = require("../models").administrador;
var bcrypt = require("bcryptjs");
const jwtGenerator = require("../utils/jwtGenerator");


module.exports = {
    create(req,res){
        return Administrador
            .create({
                username: req.body.username,
                password:bcrypt.hashSync(req.body.password, 8)
            })
            .then(admin => {
                const token = jwtGenerator(admin.idAdministrador);
                res.status(200).json({
                    token:token,
                    username: admin.username,
                    idAdminstrador: admin.idAdministrador
                });
            })
            .catch(err => {
                res.status(500).send({message:err.message});
            });
    },

    login(req,res){
        return Administrador
            .findOne({
                where:{
                    username: req.body.username
                }
            })
            .then(user => {
                if(!user){
                    return res.status(404).send({message: "User not found"});
                }

                const passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );
                if(!passwordIsValid){
                        return res.status(401).send({
                        accessToken: null,
                        message: "Invalid Password"
                    });
                }
                const token = jwtGenerator(user.id)
                    res.status(200).json({
                        token:token,
                        username : user.username
                    });
            })
            .catch(err => {
                return res.status(500).send({message: err.message});
            });
    }

}