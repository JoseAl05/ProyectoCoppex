const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const User = require("../models").Usuario;
const dotenv =  require("dotenv");



verifyToken = (req,res,next) => {
    const token = req.headers["x-access-token"];
    console.log(token);
    if (process.env.NODE_ENV !== 'development') {
        dotenv.config();
    }

    if(!token){
        res.status(403).send({
            message:"No token provided"
        });
        return;
    }
    const payload = jwt.verify(token,process.env.SECRETKEY,(err)=>{
        if(err){
            res.status(401).send({
                message: "Unauthorized"
            });
            return;
        }
        req.idAdministrador = payload.idAdministrador;
        res.status(200).next();
    });
};

const authJwt = {
    verifyToken: verifyToken
};

module.exports = authJwt;