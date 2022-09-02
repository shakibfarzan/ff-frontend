import React from 'react'

const Button = (
    { mode, content, onClick, className }: { mode: 'primary' | 'secondary'; content: string; onClick?: () => void; className?: string;}): React.ReactElement => {
  return (
    <button className={`px-3 py-2 text-light shadow-lg outline-none transition-all duration-300 font-medium ease-in-out ${mode === 'primary' ? 'bg-primary hover:bg-primary-light' : 'bg-secondary hover:bg-secondary-light'} ${className}`}
            onClick={(e): void => {
                e.preventDefault();
                onClick && onClick();
            }
    }>
        {content}
    </button>
  )
}

export default Button;