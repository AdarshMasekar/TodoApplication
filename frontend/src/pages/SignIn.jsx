import React, { useState } from "react";
import axios from 'axios'
import Input from "../components/common/Input"
import { useNavigate } from "react-router-dom";

function SignIn(){
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [message,setMessage] = useState({});
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignIn = async(e) =>{
        try{
            e.preventDefault();
            setLoading(true);
            const response = await axios.post("http://localhost:3000/api/user/signin",
                {
                    username: username,
                    email: email,
                    password: password
                },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )

            if(response.data.success){
                localStorage.setItem('todoToken','Bearer '+response.data.message)
                console.log(localStorage.getItem('todoToken'))
                setMessage({success:true,value:'welcome to Todo'})
                navigate("/dashboard")
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
        <form onSubmit={handleSignIn} className="flex flex-col p-2 gap-3">
            <label htmlFor="username" className="text-gray-700">username</label>
            <Input type="text" name="username" onChange={(e)=>setUsername(e.target.value)} value={username}/>
            <label htmlFor="email" className="text-gray-700">email</label>
            <Input type="text" name="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
            <label htmlFor="password" className="text-gray-700">password</label>
            <Input type="password" name="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <button type="submit" disabled={loading} className="bg-pink-500 text-white rounded-md p-2 hover:bg-pink-600">{loading?"loading...":"register"}</button>
        </form>
        {message && <p className={message.success? "text-green-500":"text-red-500"}> {message.value}</p>}
    </div>
}

export default SignIn;
