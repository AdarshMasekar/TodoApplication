import { useState } from "react";
import SubHeading from "../common/Subheading";
import { navlinks } from "../../utils/data";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

function Navbar() {
    const [user, setUser] = useState("akash");
    const [LoggedIn, setLoggedIn] = useState(true);
    const { theme, toggleTheme } = useTheme();

    function AuthenticatedNav() {
        return (
            <div className="flex gap-5">
                {navlinks.loggedIn.map((link) => (
                    <Link
                        to={link.path}
                        key={link.path}
                        className="text-white hover:text-gray-200"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        );
    }

    function UnauthenticatedNav() {
        return (
            <div className="flex gap-5">
                {navlinks.notLoggedIn.map((link) => (
                    <Link
                        to={link.path}
                        key={link.path}
                        className="text-white hover:text-gray-200"
                    >
                        {link.label}
                    </Link>
                ))}
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between w-full bg-indigo-500 px-4 py-2">
            <div className="logo">
                <SubHeading className="text-white">Todo</SubHeading>
            </div>
            <div className="links flex gap-5 items-center">
                {LoggedIn ? <AuthenticatedNav /> : <UnauthenticatedNav />}
                <button
                    className="bg-purple-800 text-white rounded-lg px-2 py-1 hover:bg-pink-600 transition duration-300 ease-in-out"
                    onClick={toggleTheme}
                >
                    {theme}
                </button>
            </div>
        </div>
    );
}

export default Navbar;
