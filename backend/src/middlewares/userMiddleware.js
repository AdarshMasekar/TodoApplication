const {zodErrorHandle,userValidator,signInValidator} = require("../utils/zodValidation")
const User = require("../models/User")
const {compare} = require("../utils/auth")

const signUp = async(req,res,next )=>{
    const {username, email, password} = req.body;

    const isValidUser = userValidator(username,email,password);
    if(!isValidUser.success){
        return res.status(411).json(zodErrorHandle(isValidUser));
    }
    const emailExists = await User.findOne({
        email:email
    })

    const usernameExists = await User.findOne({
        username:username
    })

    if(usernameExists){
        return res.status(400).json({
            "success":false,
            "error":"user already exists with this username!"
        })
    }

    if(emailExists){
        return res.status(400).json({
            "success":false,
            "error":"user already exists with this email!"
        })
    }
    return next();
}

const signIn = async(req,res,next )=>{
    const {email, password} = req.body;

    const isValidUser = signInValidator(email,password);
    if(!isValidUser.success){
        return res.status(411).json(zodErrorHandle(isValidUser));
    }
    const userExists = await User.findOne({
        email:email
    })

    if(!userExists){
        return res.status(400).json({
            "success":false,
            "error":"user not found with this email!"
        })
    }
    const isPasswordCorrect = await compare(password,userExists.password);
    if(!isPasswordCorrect){
        return res.status(401).json({
            "success":false,
            "error":"incorrect password!"
        })
    }
    req.username = userExists.username;
    req.userId = userExists._id;
    return next();
}

module.exports = {signUp,signIn}
