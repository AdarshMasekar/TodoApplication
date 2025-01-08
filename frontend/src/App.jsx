import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Navbar from './components/layout/Navbar';
import AddTodo from './pages/AddTodo';
import Home from "./pages/Home"
import {useAuth} from "../src/context/AuthContext"

function App() {
    const {user} = useAuth();
    return (
    <Router>
        <Navbar/>
        <Routes>
        {user ? <Route path='/' element={<Dashboard/>}></Route> : <Route path='/' element={<Home/>}></Route>}
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/signin' element={<SignIn/>}></Route>
            <Route path='/addtodo' element={<AddTodo/>}></Route>
        </Routes>
    </Router>
    );
}

export default App;
