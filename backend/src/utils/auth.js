const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
require("dotenv").config()

const HASH_SALT_ROUNDS = parseInt(process.env.HASH_SALT_ROUNDS);
const JWT_SECRET = process.env.JWT_SECRET;

const hash = async (password) =>{
    return await bcrypt.hash(password,HASH_SALT_ROUNDS);
}

const compare = async(password,hashedPassword) =>{
    return await bcrypt.compare(password,hashedPassword);
}

const generateToken = (userId,username,email) =>{
    return jwt.sign({userId:userId,username:username,email:email},JWT_SECRET,{expiresIn:'24h'})
}

module.exports = {
    hash,
    compare,
    generateToken
}
