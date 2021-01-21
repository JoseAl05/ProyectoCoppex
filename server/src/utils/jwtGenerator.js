const jwt = require("jsonwebtoken");
const dotenv =  require("dotenv");

function jwtGenerator(idAdministrador) {
    dotenv.config();
    const accessTokenSecret = process.env.SECRETKEY;
    const payload = {
        idAdministrador: idAdministrador
    };
    return jwt.sign(payload,accessTokenSecret, {
        expiresIn: 120
    })
}

module.exports = jwtGenerator;