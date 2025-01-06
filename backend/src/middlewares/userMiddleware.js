const {zodErrorHandle,userValidator} = require("../utils/zodValidation")
const {hash,compare} = require("../utils/auth")
const User = require("../models/User")

const userMiddleware = async(req,res,next )=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const isValidUser = userValidator(username,email,password);
    if(!isValidUser.success){
        return res.send(411).json(zodErrorHandle(isValidUser));
    }
    const hashedPassword = await hash(password);
    req.hashedPassword = hashedPassword;

    const userExists = await User.findOne({
        email:email
    })

    if(req.originalUrl === '/api/user/signup'){
        if(userExists){
            return res.status(400).json({
                "error":"user already exists with this email!"
            })
        }
        next();
    }
    else if(req.originalUrl === '/api/user/signin'){
        if(!userExists){
            return res.status(400).json({
                "error":"user not found with this email!"
            })
        }
        const isValidCredentials = compare(password,hashedPassword);
        if(!isValidCredentials){
            res.status(403).json({
                "error":"user credentials are incorrect!"
            })
        }
        next();
    }
    next();
}

module.exports = userMiddleware
