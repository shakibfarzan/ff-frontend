import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { getPhotosByCategory } from '../api/photo';
import { CustomImage, Empty, Loader } from '../components';
import { Photo } from '../types';

const Gallery = (): React.ReactElement => {
    const { slug, sub } = useParams<{ slug: string; sub: string }>();
    const [photos, setPhotos] = useState<Photo[]>();
    const isDesktop = useMediaQuery({ query: '(min-width: 1000px)'});

    useEffect(() => {
      if (slug) {
        getPhotosByCategory(slug, sub).then((res) => {
          setPhotos(res);
        }).catch((err) => {
          toast.error(err);
        })
      }
    }, [slug, sub])
    
  return (
    <div className={`${isDesktop ? 'mt-20' : 'mt-12'} mb-16`}>
      <p className={`text-2xl font-extrabold text-center tracking-widest text-light from-light to-secondary sticky bg-gradient-to-t py-4 -mx-8 mb-6 ${isDesktop ? 'top-20': 'top-12'}`}>
        {slug ? `${slug.split('-').join(' ').toUpperCase()}${sub ? ` - ${sub.split('-').join(' ').toUpperCase()}`: ''}` : ''}
      </p>
      {!photos ? <Loader className='flex justify-center mt-28 items-center'/> : 
        photos?.length ? 
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {photos?.map((ph, index) => (
            <CustomImage 
              images={photos?.map((ph) => ({ src: ph.src ?? '', alt: ph.name ?? '' }))} 
              currentIndex={index}
              src={ph.src}
              alt={ph.name}
              key={ph.id}
              className="shadow-2xl hover:scale-105 hover:shadow-black transition-all duration-500"
            />
          ))}
        </div> :
        <Empty text='No photo found'/>
      }
    </div>

  )
}

export default Gallery