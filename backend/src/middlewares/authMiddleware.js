const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/dotenv")

const verifyToken = (req,res,next) =>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            "error":"token not provided!"
        })
    }
    try{
        const actualToken = token.split(" ")[1];
        jwt.verify(actualToken,JWT_SECRET);
        next();
    }catch(error){
        return res.status(403).json({
            "error":"invalid token!"
        })
    }
}

module.exports = {
    verifyToken
}
