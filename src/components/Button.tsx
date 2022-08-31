import React from 'react'

const Button = (
    { mode, content, onClick }: { mode: 'primary' | 'secondary'; content: string; onClick?: () => void; }): React.ReactElement => {
  return (
    <button className={`px-3 py-1 text-light outline-none transition-all duration-300 font-medium ease-in-out ${mode === 'primary' ? 'bg-primary hover:bg-primary-light' : 'bg-secondary hover:bg-secondary-light'}`}
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