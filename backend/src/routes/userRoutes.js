const Router = require("express");
const router = Router();
const userMiddleware = require("../middlewares/userMiddleware")
const {createUser} = require("../controllers/userController")
const {generateToken} = require("../utils/auth")

router.post("/signup",userMiddleware,async(req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const hashedPassword = req.hashedPassword;
    const response = await createUser({username,email,hashedPassword});
    if(!response.success){
        return res.status(500).json({"error" :response.error});
    }
    res.status(201).json({"message":response.message})
})

router.post("/signin",userMiddleware,async(req,res)=>{
    const username = req.body.username;
    const email = req.body.email;
    const token = generateToken(username,email);

    res.status(200).json({"message":token})

})

module.exports = router;
