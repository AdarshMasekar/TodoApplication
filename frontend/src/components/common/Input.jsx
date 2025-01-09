import React from 'react';

function Input({ type, name, onChange, value, placeholder = '', className = '' }) {
    return (
        <input
            type={type}
            name={name}
            onChange={onChange}
            value={value}
            placeholder={placeholder}
            className={`input ${className}`}
        />
    );
}

export default Input;
