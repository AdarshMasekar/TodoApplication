import React from 'react';

function Card({ children, className = '' }) {
    return (
        <div className={`rounded-md shadow-md p-4 min-w-80 ${className}`}>
            {children}
        </div>
    );
}

export default Card;
