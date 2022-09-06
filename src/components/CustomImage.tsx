import React, { useState } from 'react';
import { ImageType } from '../types';
import ImageBox from './ImageBox';
import { LazyLoadImage } from "react-lazy-load-image-component";

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
            onClick={(e) => {
                e.preventDefault();
                setIsOpen && setIsOpen(true);
            }}
        >
            <LazyLoadImage 
                src={src}
                alt={alt}
                className={className}
            />
        </button> 
    </>
  )
}

export default CustomImage;