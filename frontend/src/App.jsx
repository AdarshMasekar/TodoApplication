import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Navbar from './components/layout/Navbar';
import AddTodo from './pages/AddTodo';
import {useAuth} from "../src/context/AuthContext"
import EditTodo from './pages/EditTodo';
import Profile from './pages/Profile';
import Home from './pages/Home'; // Import the Home component

function App() {
    const {user} = useAuth();
    return (
    <Router>
        <Navbar/>
        <Routes>
            <Route path='/' element={user ? <Dashboard/> : <Home/>}></Route> {/* Render Home if not logged in */}
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/signin' element={<SignIn/>}></Route>
            <Route path='/create' element={<AddTodo/>}></Route>
            <Route path='/edit/:todoId' element={<EditTodo/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
        </Routes>
    </Router>
    );
}

export default App;
