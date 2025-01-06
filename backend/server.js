const app = require("./app")
const {connectDB} = require("./src/config/db")
const {PORT} = require("./src/config/dotenv")

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
    })
})
