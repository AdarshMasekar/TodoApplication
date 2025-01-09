const Router = require("express");
const router = Router();
const {signUp,signIn} = require("../middlewares/userMiddleware")
const {createUser} = require("../controllers/userController")
const {hash,generateToken} = require("../utils/auth")

router.post("/signup",signUp,async(req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await hash(password);
    const response = await createUser({username,email,hashedPassword});
    console.log(response)
    if(!response.success){
        return res.status(500).json({"success": false, "error" :response.error});
    }
    res.status(201).json({"success": true, "message":response.message})
})

router.post("/signin",signIn,async(req,res)=>{
    const username = req.username;
    const email = req.body.email;
    const userId = req.userId;
    const token = generateToken(userId,username,email);
    res.status(200).json({"success": true, username,email,token})
})

module.exports = router;
