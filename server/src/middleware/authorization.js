const jwt = require("jsonwebtoken");
const dotenv =  require("dotenv");


module.exports = async(req,res,next) => {
    dotenv.config();
    const accessTokenSecret = process.env.SECRETKEY;
    try {
        const jwtToken = req.header("adminToken");
        if(!jwtToken){
            return res.status(403).json("Not Authorize");
        }

        const payload = await jwt.verify(jwtToken, accessTokenSecret);

        req.idAdministrador = payload.idAdministrador;
        next();

    } catch (error) {
        console.error(error.message);
        return res.status(403).json("Not Authorize");
    }
}