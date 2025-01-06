const mongoose = require("mongoose");
const {MONGO_URI} = require("../config/dotenv")

const connectDB = async() =>{
    try{
        await mongoose.connect(MONGO_URI);
        console.log('Database connected successfully');
    }catch(error){
        console.log(error)
        console.log('Database connection failed!'+ error);
    }

}

module.exports = {
    connectDB
}
