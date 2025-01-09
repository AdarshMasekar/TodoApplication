import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Heading from '../components/common/Heading';

function Home() {
    const { theme } = useTheme();
    return (
        <div className={`p-4 ${theme === 'dark' ? 'bg-[var(--bg-dark)] text-[var(--text-dark)]' : 'bg-[var(--bg-light)] text-[var(--text-light)]'}`}>
            <div className="max-w-3xl mx-auto text-center">
                <Heading>Welcome to the Todo App</Heading>
                <p className="mb-4">
                    This application helps you manage your daily tasks efficiently.
                    You can create, edit, and delete todos, and track their progress.
                </p>
                <p className="mb-4">
                    Please sign up or sign in to start managing your todos.
                </p>
                <div className="flex justify-center gap-4">
                    <a href="/signup" className="bg-blue-500 text-white rounded-md p-2 hover:bg-blue-600">Sign Up</a>
                    <a href="/signin" className="bg-green-500 text-white rounded-md p-2 hover:bg-green-600">Sign In</a>
                </div>
            </div>
        </div>
    );
}

export default Home;
