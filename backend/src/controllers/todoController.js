const Todo = require("../models/Todo");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/dotenv");

const createTodo = async({title,category,priority,dueDate,status},token)=>{
    try{
        const decodedToken = jwt.verify(token,JWT_SECRET);
        const userId = decodedToken.userId;
        const newTodo = await Todo.create({title,category,priority,dueDate,status,userId});
        return {
            "success":true,
            "message":"todo creation successfull!",
            "todoId":newTodo._id
        };
    }catch(error){
        return {
            "success":false,
            "error":"todo creation failed!"
        };
    }
}
const getTodos = async(token)=>{
    try{
        const decodedToken = jwt.verify(token,JWT_SECRET);
        const userId = decodedToken.userId;
        const todos = await Todo.find({userId:userId});
        return {
            "success":true,
            todos:todos
        };
    }catch(error){
        return {
            "success":false,
            "error":"todos fetching failed!"
        };
    }
}

const getTodo = async(id,token)=>{
    try{
        const decodedToken = jwt.verify(token,JWT_SECRET);
        const userId = decodedToken.userId;
        const todo = await Todo.findOne({_id:id,userId:userId});
        return {
            "success":true,
            todo:todo
        };
    }catch(error){
        return {
            "success":false,
            "error":"todo fetching failed!"
        };
    }
}

const updateTodo = async(id,{title,category,priority,dueDate,status},token) =>{
    try{
        const decodedToken = jwt.verify(token,JWT_SECRET);
        const userId = decodedToken.userId;
        await Todo.findOneAndUpdate({_id:id,userId:userId},
            {$set:{
                    title:title,
                    category:category,
                    priority:priority,
                    dueDate:dueDate,
                    status:status
                }
            },
            {new:true})
        return {
            "success":true,
            "message":"todo updated successfully!"
        };
    }catch(error){
        return {
            "success":false,
            "error":"todo updation failed!"
        };
    }
}

const updateStatus = async(id,status,token) =>{
    try{
        const decodedToken = jwt.verify(token,JWT_SECRET);
        const userId = decodedToken.userId;
        await Todo.findOneAndUpdate({_id:id,userId:userId},{
            $set:{status:status}
        })
        return {
            "success":true,
            "message":"todo updated successfully!"
        };
    }
    catch(error){
        return {
            "success":false,
            "error":"todo updation failed!"
        };
    }
}

const deleteTodo = async(id,token)=>{
    try{
        const decodedToken = jwt.verify(token,JWT_SECRET);
        const userId = decodedToken.userId;
        await Todo.findOneAndDelete({_id:id,userId:userId});
        return {
            "success":true,
            "message":"todo deleted successfully!"
        };
    }catch(error){
        return {
            "success":false,
            "error":"todo deletion failed!"
        };
    }
}

module.exports = {
    createTodo,
    getTodo,
    getTodos,
    updateTodo,
    updateStatus,
    deleteTodo
}
