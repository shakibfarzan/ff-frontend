import React, { useEffect, useState } from 'react';
import Lightbox, { ImagesListType } from 'react-spring-lightbox';
import { Close } from '../assets/Icons';
import { ImageType } from '../types';
import ArrowButton from './ArrowButton';

const ImageBox = (
  { image, currentIndex, isOpen, setIsOpen }: 
  { image: ImageType | ImageType[]; currentIndex?: number; isOpen: boolean; setIsOpen: (val: boolean) => void }
): React.ReactElement => {
    const [currentImageIndex, setCurrentIndex] = useState(currentIndex ?? 0);
    const [images, setImages] = useState<ImagesListType>([]);

    useEffect(() => {
        if (Array.isArray(image)) {
          setImages(image.map(({ src, alt }) => ({ src, alt, loading: 'lazy' })));
        } else {
          const { src, alt } = image;
          setImages([{ src, alt, loading: 'lazy' }]);
        }
    }, [image]);

    const gotoPrevious = () =>
        currentImageIndex > 0 && setCurrentIndex(currentImageIndex - 1);

    const gotoNext = () =>
        currentImageIndex + 1 < images.length &&
        setCurrentIndex(currentImageIndex + 1);
    
    const handleClose = () => {
      setIsOpen(false);
      setCurrentIndex(currentIndex ?? 0);
    }

  return (
    <Lightbox
      isOpen={isOpen}
      onPrev={gotoPrevious}
      onNext={gotoNext}
      images={images}
      currentIndex={currentImageIndex}
      singleClickToZoom
      /* Add your own UI */
      renderHeader={() => (
        <div className='flex justify-end'>
          <button onClick={(e) =>{
            e.preventDefault();
            handleClose();
          }}>
            <Close />
          </button>
        </div>
      )}
      // renderFooter={() => (<CustomFooter />)}
      renderPrevButton={() => (<ArrowButton disabled={currentImageIndex === 0} position={'left'} onClick={gotoPrevious} />)}
      renderNextButton={() => (<ArrowButton disabled={!Array.isArray(image) || image.length - 1 === currentImageIndex} position={'right'} onClick={gotoNext}/>)}
      // renderImageOverlay={() => (<ImageOverlayComponent >)}

      /* Add styling */
      className="bg-granite bg-opacity-50 backdrop-blur-md z-50"

      /* Handle closing */
      onClose={handleClose}

      /* react-spring config for open/close animation */
      pageTransitionConfig={{
        from: { transform: "scale(0.75)", opacity: 0 },
        enter: { transform: "scale(1)", opacity: 1 },
        leave: { transform: "scale(0.75)", opacity: 0 },
        config: { mass: 1, tension: 320, friction: 32 }
      }}
    />
  )
}

export default ImageBox;