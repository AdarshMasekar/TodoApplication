const express = require("express");
const todoRouter = require("./src/routes/todoRoutes")
const userRouter = require("./src/routes/userRoutes")
const cors = require("cors");

const app = express();
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));
app.use(express.json());
app.use("/api/todos",todoRouter);
app.use("/api/user",userRouter);
// app.use(errorHandler);

app.use((err, req, res, next) => {
    if (err) {
        // Log the error
        console.error("Error occurred:", err.message);
        // Check if it's a 404 or a general server error
        if (err.status === 404) {
            res.status(404).json({
                success: false,
                message: "Not Found"
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    } else {
        next();
    }
});


app.get("/",(req,res)=>{
    res.json("welcome to home page!")
})

module.exports = app;
