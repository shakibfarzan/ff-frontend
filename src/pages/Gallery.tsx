import React from 'react'
import { useParams } from 'react-router-dom'

const Gallery = () => {
    const { slug } = useParams<{ slug: string }>();  
  return (
    <div>Gallery {slug}</div>
  )
}

export default Gallery