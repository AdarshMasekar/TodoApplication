import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import  Input  from '../components/common/Input';
import Button from '../components/common/Button';
import { useTheme } from '../context/ThemeContext'; // Import useTheme hook
import { useAuth } from '../context/AuthContext';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { theme } = useTheme(); // Use the theme context
    const {setIsLoggedIn} = useAuth();

    const handleSignIn = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const response = await axios.post("http://localhost:3000/api/user/signin",
                {
                    email: email,
                    password: password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                localStorage.setItem('todoToken', 'Bearer ' + response.data.token);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('email', response.data.email);
                setMessage({ success: true, value: 'welcome to Todo' });
                setIsLoggedIn(true)
                navigate("/");
            } else {
                setMessage({ success: false, value: response.data.error });
            }
        } catch (error) {
            setMessage({ success: false, value: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`bg-[var(--bg-${theme})] p-4`}> {/* Adjusted to use theme context for background */}
            <div className="max-w-md mx-auto">
                <form onSubmit={handleSignIn} className="flex flex-col p-2 gap-3">
                    <label htmlFor="email" className={`text-[var(--text-${theme})]`}>Email</label> {/* Adjusted to use theme context for text color */}
                    <Input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />

                    <label htmlFor="password" className={`text-[var(--text-${theme})]`}>Password</label> {/* Adjusted to use theme context for text color */}
                    <Input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />

                    <Button type="submit" className="bg-[var(--primary-color)] mt-5">{loading ? "loading..." : "Sign In"}</Button>
                </form>
                {message && <p className={message.success ? "text-green-500" : "text-red-500"}> {message.value}</p>}
            </div>
        </div>
    );
}

export default SignIn;
