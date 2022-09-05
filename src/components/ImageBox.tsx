import React, { useEffect, useState } from 'react';
import Lightbox, { ImagesListType } from 'react-spring-lightbox';
import { ImageType } from '../types';

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

  return (
    <Lightbox
      isOpen={isOpen}
      onPrev={gotoPrevious}
      onNext={gotoNext}
      images={images}
      currentIndex={currentImageIndex}
      /* Add your own UI */
      // renderHeader={() => (<CustomHeader />)}
      // renderFooter={() => (<CustomFooter />)}
      // renderPrevButton={() => (<CustomLeftArrowButton />)}
      // renderNextButton={() => (<CustomRightArrowButton />)}
      // renderImageOverlay={() => (<ImageOverlayComponent >)}

      /* Add styling */
      className="bg-granite bg-opacity-50 backdrop-blur-md z-50"

      /* Handle closing */
      onClose={() => setIsOpen(false)}

      /* Use single or double click to zoom */
      // singleClickToZoom

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