import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Todos(){
    const [todos,setTodos] = useState([]);
    const {token} = useAuth();

    useEffect(()=>{
        const fetchTodos = async()=>{
            try{
                const response = await axios.get("http://localhost:3000/api/todos",
                {
                    headers:{
                        'Authorization': 'Bearer '+token
                    }
                }
                )
                setTodos(response.data);
            }catch(error){
                console.log(error)
            }
        }
        fetchTodos();
    },[])

    return <div className="todos">
        {todos && todos.map(todo =>{
            return <div className="todo" key={todo._id}>
                {todo.title}-{todo.category}
            </div>
        })}
    </div>
}
export default Todos;
