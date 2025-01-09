import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Input  from '../components/common/Input';
import Button from '../components/common/Button';
import { useTheme } from '../context/ThemeContext'; // Import useTheme hook

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { theme } = useTheme(); // Use the theme context

    const handleSignUp = async (e) => {
        try {
            e.preventDefault();
            setLoading(true);
            const response = await axios.post("http://localhost:3000/api/user/signup",
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

            if (response.data.success) {
                setMessage({ success: true, value: 'user registered successfully!' });
                navigate("/signin");
            } else {
                setMessage({ success: false, value: response.data.error });
            }
        } catch (error) {
            setMessage({ success: false, value: error.message });
        } finally {
            setLoading(false);
        }
    }
    return <div className={`bg-[var(--bg-${theme})] p-4`}>
        <div className="max-w-md mx-auto">
            <form onSubmit={handleSignUp} className="flex flex-col p-2 gap-3">
                <label htmlFor="username" className={`text-[var(--text-${theme})]`}>Username</label>
                <Input type="text" name="username" onChange={(e) => setUsername(e.target.value)} value={username} />
                <label htmlFor="email" className={`text-[var(--text-${theme})]`}>Email</label>
                <Input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <label htmlFor="password" className={`text-[var(--text-${theme})]`}>Password</label>
                <Input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <Button type="submit" className="bg-[var(--primary-color)] mt-5">{loading ? "loading..." : "Sign Up"}</Button>
            </form>
            {message && <p className={message.success ? "text-green-500 text-center" : "text-red-500 text-center"}> {message.value}</p>}
        </div>
    </div>
}
export default SignUp;
