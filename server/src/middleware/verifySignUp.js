const Administrador = require("../models").administrador;

checkDuplicateNickname = (req,res,next) => {
    return Administrador
        .findOne({
            where:{
                username:req.body.username
            }
        })
        .then(admin => {
            if(admin){
                res.status(400).json({
                    message: "Failed! Nickname is already in use"
                });
                return;
            }
            next();
        })
        .catch(err => {
            res.status(400).send(err);
        });
}
const verifySignUp = {
    checkDuplicateNickname: checkDuplicateNickname
};
module.exports = verifySignUp;