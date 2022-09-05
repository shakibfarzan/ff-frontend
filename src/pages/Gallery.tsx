import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { getPhotosByCategory } from '../api/photo';
import { CustomImage, Empty } from '../components';
import { Category, Photo } from '../types';

const Gallery = ({ categories }: { categories: Category[] | undefined }): React.ReactElement => {
    const { slug } = useParams<{ slug: string }>();
    const [photos, setPhotos] = useState<Photo[]>();
    const [category, setCategory] = useState<string>();
    const isDesktop = useMediaQuery({ query: '(min-width: 1000px)'});

    useEffect(() => {
      if (slug) {
        setCategory(categories?.find((c) => c.slug === slug)?.name)
        getPhotosByCategory(slug).then((res) => {
          setPhotos(res);
        }).catch((err) => {
          toast.error(err.message);
        })      
      }
    }, [categories, slug])
    
  return (
    <div className={`${isDesktop ? 'mt-20' : 'mt-12'} mb-16`}>
      <p className={`text-2xl font-extrabold text-center tracking-widest text-light from-light to-secondary sticky bg-gradient-to-t py-4 -mx-8 mb-6 ${isDesktop ? 'top-20': 'top-12'}`}>
        {category?.toUpperCase()}
      </p>
      {photos?.length ? 
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {photos?.map((ph, index) => (
            <CustomImage 
              images={photos?.map((ph) => ({ src: ph.src ?? '', alt: ph.name ?? '' }))} 
              currentIndex={index}
              src={ph.src}
              alt={ph.name}
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