const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:["Personal","Work","Other"],
        default:"Personal",
        required:true
        },
    priority:{
        type:String,
        enum:["high","normal","low"],
        required:true
    },
    dueDate :{
        type:Date,
        default: ()=>{
            const now = new Date();
            now.setDate(now.getDate()+7);
            return now;
        },
        required:true
    },
    status:{
        type:String,
        enum:["pending","completed","expired"],
        default:"pending",
        required:true
    }
},{timestamps:true})

const Todo = new mongoose.model("Todo",todoSchema);

module.exports = Todo;
