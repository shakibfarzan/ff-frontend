import React from 'react'

const Input = (
    { value, type, onChange, autoFocus, className, id, name, placeholder }:
    { 
        value?: string | number | undefined;
        type?: string;
        onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
        autoFocus?: boolean;
        className?: string;
        id?: string;
        name?: string;
        placeholder?: string;
    }
): React.ReactElement => {
  return (
    <input 
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        className={`block text-sm px-2 py-2 outline-none text-secondary ${className}`}
        id={id} 
        name={name} 
        type={type}
        placeholder={placeholder}
    />
  )
}

Input.defaultProps = {
    autoFocus: false,
}

export default Input;