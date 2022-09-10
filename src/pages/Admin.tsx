import React, { ReactElement, useEffect, useState } from 'react'
import { useJwt, decodeToken } from 'react-jwt';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { refreshToken } from '../api/auth';
import { Button } from '../components';
import { Photo, Category, ContactField, Bio, SubCategory } from '../types';
import { Bio as BioPage, Categories, ContactFields, Logout, Photos, SubCategories } from './adminPages';


const Admin = ({
  photos,
  categories,
  bio,
  contactFields,
  subCategories,
  setRefreshPhotos,
  setRefreshCategories,
  setRefreshBio,
  setRefreshContactFields,
  setRefreshSubCategories,
}:{
  photos: Photo[] | undefined;
  categories: Category[] | undefined;
  bio: Bio | undefined;
  contactFields: ContactField[] | undefined;
  subCategories: SubCategory[] | undefined;
  setRefreshPhotos: (val: boolean) => void;
  setRefreshCategories: (val: boolean) => void;
  setRefreshBio: (val: boolean) => void;
  setRefreshContactFields: (val: boolean) => void;
  setRefreshSubCategories: (val: boolean) => void;
}) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access token');
  const { isExpired } = useJwt(token ?? '');
  const decodedToken = decodeToken(token ?? '');
  const isMobile = useMediaQuery({ query: '(max-width: 800px)' });
  useEffect(() => {
      if (!decodedToken) {
        navigate('/not-found');
      }
      if (isExpired) {
        refreshToken();
      }
  }, [decodedToken, isExpired, navigate]);
  
  const [itemState, setItemState] = useState('Photos');

  const items: Record<string, ReactElement> = {
    'Photos': <Photos photos={photos} categories={categories} subCategories={subCategories} setRefresh={setRefreshPhotos} />,
    'Categories': <Categories categories={categories} setRefresh={setRefreshCategories} />,
    'Sub Categories': <SubCategories categories={categories} subCategories={subCategories} setRefresh={setRefreshSubCategories} />,
    'Bio': <BioPage bio={bio} setRefresh={setRefreshBio} />,
    'Contact Fields': <ContactFields contactFields={contactFields} setRefresh={setRefreshContactFields} />,
    'Logout': <Logout />,
  }
  return (
    <div className='mt-28 mb-16'>
      <div className="bg-granite bg-opacity-20 w-full p-5 mb-4 flex justify-around flex-wrap">
        {Object.keys(items).map((item) => (
          <Button key={item} mode={item === itemState ? 'primary' : 'secondary'} content={item} onClick={() => setItemState(item)} className={isMobile ? 'mb-2' : ''}/>
        ))}
      </div>
      {items[itemState]}
    </div>
  )
}

export default Admin