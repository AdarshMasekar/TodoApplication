const Todo = require("../models/Todo");

const createTodo = async({title,category,priority,dueDate,status})=>{
    try{
        await Todo.create({title,category,priority,dueDate,status});
        return {
            "success":true,
            "message":"todo creation successfull!"
        };
    }catch(error){
        return {
            "success":false,
            "error":"todo creation failed!"
        };
    }
}

const getTodos = async()=>{
    try{
        const todos = await Todo.find();
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

const getTodo = async(id)=>{
    try{
        const todo = await Todo.findOne({_id:id});
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

const updateTodo = async(id,{title,category,priority,dueDate,status}) =>{
    try{
        await Todo.findByIdAndUpdate(id,
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

const updateStatus = async(id,status) =>{
    try{
        await Todo.findByIdAndUpdate(id,{
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
const deleteTodo = async(id)=>{
    try{
        await Todo.findByIdAndDelete(id);
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
