import React, { useState } from 'react';
import { ImageType } from '../types';
import ImageBox from './ImageBox';

const CustomImage = (
    { src, alt, className, images, currentIndex }:
    { src?: string; alt?: string; className?: string; images?: ImageType[]; currentIndex?: number }
): React.ReactElement => {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <>
        <ImageBox 
            image={ images ?
                    images:
                (src && alt) ? 
                    {
                        src,
                        alt,
                        caption: undefined
                    } 
                    : {
                      src: '',
                      alt: '',
                      caption: undefined
                    }} 
            isOpen={isOpen} 
            setIsOpen={setIsOpen}
            currentIndex={currentIndex}
        />
        <button 
            onClick={() => {
                setIsOpen && setIsOpen(true);
            }}
        >
            <img 
                src={src}
                alt={alt}
                className={className}
            />
        </button> 
    </>
  )
}

export default CustomImage;