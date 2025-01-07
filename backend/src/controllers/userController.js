const User = require("../models/User");

const createUser = async({username,email,hashedPassword})=>{
    try{
        await User.create({
            username:username,
            email:email,
            password:hashedPassword
        });
        return {
            "success" : true,
            "message":"user registration successfull!"
        }
    }
    catch(error){
        return {
            "success" : true,
            "message":"user registration failed!"
        }
    }
}

// const updateTodo = async(id,{title,category,priority,dueDate,status}) =>{
//     try{
//         const response = await Todo.findByIdAndUpdate(id,
//             {$set:{
//                     title:title,
//                     category:category,
//                     priority:priority,
//                     dueDate:dueDate,
//                     status:status
//                 }
//             },
//             {new:true})
//         return response._id;
//     }catch(error){
//         console.log("error during updating the todo! "+error)
//         return;
//     }
// }

// const updateStatus = async(id,status) =>{
//     try{
//         const response = await Todo.findByIdAndUpdate(id,{
//             $set:{status:status}
//         })
//         return response;
//     }
//     catch(error){
//             console.log("error during updating the status! "+error);
//             return;
//     }
// }
// const deleteTodo = async(id)=>{
//     try{
//         const response = await Todo.findByIdAndDelete(id);
//         return response._id;
//     }catch(error){
//         console.log("error during updating the todo! "+error)
//         return;
//     }
// }

module.exports = {
    createUser,
    // markEmailVerified
    // getTodo,
    // getTodos,
    // updateTodo,
    // updateStatus,
    // deleteTodo
}
