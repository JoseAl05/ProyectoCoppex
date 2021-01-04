const jwt = require("jsonwebtoken");
const dotenv =  require("dotenv");


module.exports = async(req,res,next) => {
    if (process.env.NODE_ENV !== 'development') {
        dotenv.config();
    }
    const accessTokenSecret = process.env.SECRETKEY;
    try {
        const jwtToken = req.header("token");
        if(!jwtToken){
            return res.status(403).json("Not Authorize");
        }

        const payload = await jwt.verify(jwtToken, accessTokenSecret);

        req.administrador = payload.adminstrador;
        next();

    } catch (error) {
        console.error(error.message);
        return res.status(403).json("Not Authorize");
    }
}