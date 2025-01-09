import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import Heading from '../components/common/Heading';

function Profile() {
    const { user, email } = useAuth();
    const { theme } = useTheme();

    return (
        <div className={`p-4 ${theme === 'dark' ? 'bg-[var(--bg-dark)] text-[var(--text-dark)]' : 'bg-[var(--bg-light)] text-[var(--text-light)]'}`}>
            <div className="max-w-5xl mx-auto">
                <Heading>User Profile</Heading>
                <p><strong>Username:</strong> {user}</p>
                <p><strong>Email:</strong> {email}</p>
            </div>
            {/* Add more profile details here */}
        </div>
    );
}

export default Profile;
