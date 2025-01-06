const User = require("../models/User");

const createUser = async({username,email,hashedPassword})=>{
    try{
        await User.create({
            username:username,
            email:email,
            password:hashedPassword
        });
        return {
            "success" : true,
            "message":"user registration successfull!"
        }
    }
    catch(error){
        return {
            "success" : true,
            "message":"user registration failed!"
        }
    }
}


module.exports = {
    createUser,
}
