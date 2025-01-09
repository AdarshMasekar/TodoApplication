import React from 'react';

function Heading({ children, className = '' }) {
    return (
        <h2 className={`text-2xl font-bold mb-4 ${className}`}>
            {children}
        </h2>
    );
}

export default Heading;
