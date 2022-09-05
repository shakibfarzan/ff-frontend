import React from 'react'

const Empty = ({ text }: { text: string }): React.ReactElement => {
  return (
    <p className='absolute top-1/2 left-1/2 -mx-28 text-2xl font-extrabold'>
      {text.toUpperCase()}
    </p>
  )
}

export default Empty