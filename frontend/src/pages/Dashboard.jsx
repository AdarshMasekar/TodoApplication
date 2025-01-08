import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Card from "../components/common/Card";
import Heading from "../components/common/Heading";
import SubHeading from "../components/common/Subheading";
import { useTheme } from "../context/ThemeContext";

function Dashboard(){
    const [todos,setTodos] = useState([]);
    const [message,setMessage] = useState({});
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const {theme} = useTheme();

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                setLoading(true);
                const todoToken = localStorage.getItem("todoToken")
                const response = await axios.get("http://localhost:3000/api/todos",
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': todoToken
                    }
                }
                )
                if(response.data){
                    setMessage({success:true,value:'todo fetch successfull'})
                    setTodos(response.data)
                }else{
                    setMessage({success:false,value:response.data.message})
                }
            }catch(error){
                setMessage({success:false,value:error.message});
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    },[])

    return (
        <div className={`p-4 ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
            <Heading>Dashboard</Heading>
            {loading && <p className="text-center my-4">Loading...</p>}
            {todos && todos.length > 0 ? (
                <div className="flex flex-wrap gap-8 justify-center mt-6">
                    {todos.map(({_id,title,category,priority,dueDate,status}) => (
                        <Card key={_id} className={theme === 'dark' ? 'bg-gray-700' : 'bg-white'}>
                            <Heading>{title}</Heading>
                            <SubHeading>{category}</SubHeading>
                            <p>Priority: <span className={`font-medium ${priority === 'high' ? 'text-red-500' : priority === 'normal' ? 'text-yellow-500' : 'text-green-500'}`}>{priority}</span></p>
                            <p>Due Date: {new Date(dueDate).toLocaleDateString()}</p>
                            <p>Status: <span className={`font-medium ${status === 'pending' ? 'text-yellow-500' : status === 'completed' ? 'text-green-500' : 'text-red-500'}`}>{status}</span></p>
                        </Card>
                    ))}
                </div>
            ) : (
                !loading && <p className="text-center mt-4">No todos found.</p>
            )}
            {message.value && <p className={message.success ? "text-green-500 text-center mt-4" : "text-red-500 text-center mt-4"}> {message.value}</p>}
        </div>
    );
}

export default Dashboard;
