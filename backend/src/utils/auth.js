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

const generateToken = (username,email) =>{
    return jwt.sign({username:username,email:email},JWT_SECRET,{expiresIn:'24h'})
}

// const sendEmailVerification = async(userId,email) =>{
//     const verificationToken = jwt.sign({userId},JWT_SECRET,{expiresIn:'5m'})

//     // Email options
//     const mailOptions = {
//         from: EMAIL, // Your verified sender email
//         to: email,
//         subject: "Email Verification",
//         text: `Please verify your email by clicking on the following link: ${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`,
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log(`Verification email sent to ${email}`);
//     } catch (error) {
//         console.error("Error sending email:", error);
//         throw new Error("Failed to send verification email.");
//     }
// }

// const verifyToken = (token) =>{
//     const response = jwt.verify(token,JWT_SECRET);
//     return response;
// }

module.exports = {
    hash,
    compare,
    generateToken
    // sendEmailVerification,
    // verifyToken
}
