import React from 'react';

function Button({ children, onClick, className = '', type = 'button' }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-[var(--primary-color)] text-white rounded-md p-2 hover:bg-[color-mix(in srgb,var(--primary-color),#000 20%)] transition duration-300 ease-in-out ${className}`}
        >
            {children}
        </button>
    );
}

export default Button;
