import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const navlinks = {
    loggedIn: [
        { label: 'dashboard', path: '/' },
        { label: 'create', path: '/create' },
        { label: 'profile', path: '/profile' },
        { label: 'logout', path: '/signin' },
    ],
    loggedOut: [
        { label: 'sign up', path: '/signup' },
        { label: 'sign in', path: '/signin' },
    ],
};

function Navbar() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false); // Add state for menu toggle

    function handleLogout(event) {
        event.preventDefault();
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('todoToken');
        setIsLoggedIn(false);
        navigate("/signin")
    }

    function handleLinkClick(event, link) {
        setIsMenuOpen(false);
        if (link.label === 'logout') {
            handleLogout(event);
        }
    }

    function AuthenticatedNav() {
        return (
            <div className="flex gap-5">
                {navlinks.loggedIn.map((link) => (
                    <button className="link" key={link.path} onClick={(e) => handleLinkClick(e, link)}>
                        <Link
                            to={link.path}
                            className="text-white hover:text-gray-200 transition duration-300 ease-in-out border border-gray-300 rounded-md px-2 py-1"
                        >
                            {link.label}
                        </Link>
                    </button>
                ))}
            </div>
        );
    }

    function UnauthenticatedNav() {
        return (
            <div className={`flex gap-5 ${isMenuOpen ? 'flex flex-col' : ''}`}>
                {navlinks.loggedOut.map((link) => (
                    <button className="link" key={link.path} onClick={(e) => handleLinkClick(e, link)}>
                        <Link
                            key={link.path}
                            to={link.path}
                            className="text-white hover:text-gray-200 transition duration-300 ease-in-out border border-gray-300 rounded-md px-2 py-1"
                        >
                            {link.label}
                        </Link>
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div className="flex items-center md:justify-around justify-between w-full bg-indigo-500 px-4 py-2"> {/* Changed justify-around to justify-between */}
            <div className="logo">
                <Link to="/">Todo</Link>
            </div>
            <div className="md:hidden"> {/* Hamburger menu for smaller screens */}
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
                    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                        {isMenuOpen ? (
                            <path fillRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.829z" />
                        ) : (
                            <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                        )}
                    </svg>
                </button>
            </div>
            <div className={`links md:flex gap-5 items-center ${isMenuOpen ? 'flex flex-col absolute top-10 right-0 bg-indigo-500 p-4 mt-1 w-full md:w-auto' : 'hidden md:flex'}`}> {/* Conditionally render links and add styles for mobile menu */}
                {isLoggedIn ? <AuthenticatedNav /> : <UnauthenticatedNav />}
                <button
                    className="bg-[var(--secondary-color)] text-white rounded-lg px-2 py-1 hover:bg-[color-mix(in srgb,var(--secondary-color),#000 20%)] transition duration-300 ease-in-out"
                    onClick={toggleTheme}
                >
                    {theme}
                </button>
            </div>
        </div>
    );
}

export default Navbar;
