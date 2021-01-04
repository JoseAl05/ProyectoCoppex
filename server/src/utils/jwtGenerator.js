const jwt = require("jsonwebtoken");
const dotenv =  require("dotenv");

function jwtGenerator(idAdministrador) {
    if (process.env.NODE_ENV !== 'development') {
        dotenv.config();
    }
    const accessTokenSecret = process.env.SECRETKEY;
    const payload = {
        administrador:{
            idAdministrador: idAdministrador
        }
    };
    return jwt.sign(payload,accessTokenSecret, {
        expiresIn: "1h"
    })
}

module.exports = jwtGenerator;