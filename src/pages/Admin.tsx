import React, { ReactElement, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getBio, getContactFields } from '../api/about';
import { getCategories } from '../api/category';
import { getPhotos } from '../api/photo';
import { Button } from '../components';
import Bio from '../types/Bio';
import Category from '../types/Category';
import ContactField from '../types/ContactField';
import Photo from '../types/Photo';
import { Bio as BioPage, Categories, ContactFields, Logout, Photos } from './adminPages';


const Admin = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 800px)' });
  const [refreshPhotos, setRefreshPhotos] = useState(false);
  const [refreshCategories, setRefreshCategories] = useState(false);
  const [refreshBio, setRefreshBio] = useState(false);
  const [refreshContactFields, setRefreshContactFields] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/not-found');
    }
  }, [navigate]);
  
  const [item, setItem] = useState('Photos');
  const [photos, setPhotos] = useState<Photo[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [bio, setBio] = useState<Bio>();
  const [contactFields, setContactFields] = useState<ContactField[]>();

  useEffect(() => {
    getPhotos().then((res) => {
      setPhotos(res);
    }).catch((err) => {
      toast.error(err.message);
    });
    setRefreshPhotos(false);
  }, [refreshPhotos]);

  useEffect(() => {
    getCategories().then((res) => {
      setCategories(res);
    }).catch((err) => {
      toast.error(err.message);
    });
    setRefreshCategories(false);
  }, [refreshCategories]);

  useEffect(() => {
    getBio().then((res) => {
      setBio(res);
    }).catch((err) => {
      toast.error(err.message);
    });
    setRefreshBio(false);
  }, [refreshBio]);

  useEffect(() => {
    getContactFields().then((res) => {
      setContactFields(res);
    }).catch((err) => {
      toast.error(err.message);
    });
    setRefreshContactFields(false);
  }, [refreshContactFields]);

  const items: Record<string, ReactElement> = {
    'Photos': <Photos photos={photos} categories={categories} setRefresh={setRefreshPhotos} />,
    'Categories': <Categories categories={categories} setRefresh={setRefreshCategories} />,
    'Bio': <BioPage bio={bio} setRefresh={setRefreshBio} />,
    'Contact Fields': <ContactFields contactFields={contactFields} setRefresh={setRefreshContactFields} />,
    'Logout': <Logout />,
  }
  return (
    <div className='mt-28'>
      <div className="bg-granite bg-opacity-20 w-full p-5 mb-4 flex justify-around flex-wrap">
        {Object.keys(items).map((item) => (
          <Button mode={'secondary'} content={item} onClick={() => setItem(item)} className={isMobile ? 'mb-2' : ''}/>
        ))}
      </div>
      {items[item]}
    </div>
  )
}

export default Admin