import React, { useState } from "react";
import axios from 'axios'
import Input from "../components/common/Input"
import { useNavigate } from "react-router-dom";

function AddTodo(){
    const [title,setTitle] = useState('');
    const [category,setCategory] = useState('');
    const [priority,setPriority] = useState('');
    const [dueDate,setDueDate] = useState(new Date());
    const [status,setStatus] = useState('');
    const [message,setMessage] = useState({});
    const[loading,setLoading] = useState(false);

    const navigate = useNavigate();

    const handleAddTodo = async(e) =>{
        try{
            e.preventDefault();
            setLoading(true);
            const todoToken = localStorage.getItem("todoToken")
            console.log("Title:", title);
            console.log("Category:", category);
            console.log("Priority:", priority);
            console.log("Due Date:", dueDate);
            console.log("Status:", status);
            const response = await axios.post("http://localhost:3000/api/todos",
                {
                    title: title,
                    category: category,
                    priority: priority,
                    dueDate: dueDate,
                    status: status
                },
            {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": todoToken
                }
            }
            )

            if(response.data.message === "todo created successfully!"){
                setMessage({success:true,value:'todo created successfully!'})
            }else{
                setMessage({success:false,value:response.data.message})
            }
        }catch(error){
            setMessage({success:false,value:error.message});
        }finally{
            setLoading(false);
        }
    }

    return <div className="bg-gray-100 p-4">
        <form onSubmit={handleAddTodo} className="flex flex-col p-2 gap-3">
            <label htmlFor="title" className="text-gray-700">title</label>
            <Input type="text" name="title" onChange={(e)=>setTitle(e.target.value)} value={title}/>

            <label htmlFor="category" className="text-gray-700">category</label>
            <select name="category" id="category" onChange={(e)=>setCategory(e.target.value)} value={category} className="input">
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
            </select>

            <label htmlFor="priority" className="text-gray-700">priority</label>
            <select name="priority" id="priority" onChange={(e)=>setPriority(e.target.value)} value={priority} className="input">
                <option value="high">high</option>
                <option value="normal">normal</option>
                <option value="low">low</option>
            </select>

            <label htmlFor="dueDate" className="text-gray-700">dueDate</label>
            <input type="date"  name="dueDate" onChange={(e) =>{setDueDate(e.target.value)}} value={dueDate} className="input"/>

            <label htmlFor="status" className="text-gray-700">status</label>
            <select name="status" id="status" onChange={(e)=>setStatus(e.target.value)} value={status} className="input">
                <option value="pending">pending</option>
                <option value="completed">completed</option>
            </select>

            <button type="submit"  className="bg-pink-500 text-white rounded-md p-2 hover:bg-pink-600">{loading? "loading...":"add todo"}</button>
        </form>
        {message && <p className={message.success? "text-green-500":"text-red-500"}> {message.value}</p>}
    </div>
}

export default AddTodo;
