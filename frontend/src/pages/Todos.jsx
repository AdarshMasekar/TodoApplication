import axios from "axios";
import { useEffect, useState } from "react";

function Todos(){
    const [todos,setTodos] = useState([]);

    useEffect(()=>{
        const response = axios.get("",
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzdjZmM5MjFlYTRiNTQ3YWQ0NzczZjIiLCJ1c2VybmFtZSI6ImFkYXJhaG1hc2VrYXIxMiIsImVtYWlsIjoiYWRhcmFobWFzZWthcjEyQGdtYWlsLmNvbSIsImlhdCI6MTczNjI0Njg5MCwiZXhwIjoxNzM2MzMzMjkwfQ.hHkNSzIwY9jLTEIUS75yBz170PVI9imt2KD0v7gY1nc'
        )
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
