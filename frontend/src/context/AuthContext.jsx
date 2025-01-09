import React, { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [user,setUser] = useState("");
    const [email,setEmail] = useState("");
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    useEffect(()=>{
        const username = localStorage.getItem("username");
        if(username){
            setUser(username);
        }

        const email = localStorage.getItem("email");
        if(email){
            setEmail(email);
        }

        const token = localStorage.getItem("todoToken");
        if(token) {
            setIsLoggedIn(true)
        }
    },[])

    const contextValue = {
        user,
        email,
        isLoggedIn,
        setIsLoggedIn
    }
    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

export {AuthContext,AuthProvider}
