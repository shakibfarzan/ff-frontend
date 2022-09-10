import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Admin from './pages/Admin';
import { Navbar } from './components';
import Bio from './types/Bio';
import { getBio, getContactFields } from './api/about';
import { Category, ContactField, Photo, SubCategory } from './types';
import { getCategories, getSubCategories } from './api/category';
import { getPhotos } from './api/photo';

function App(): React.ReactElement {
  const [refreshPhotos, setRefreshPhotos] = useState(false);
  const [refreshCategories, setRefreshCategories] = useState(false);
  const [refreshBio, setRefreshBio] = useState(false);
  const [refreshContactFields, setRefreshContactFields] = useState(false);
  const [refreshSubCategories, setRefreshSubCategories] = useState(false);

  const [photos, setPhotos] = useState<Photo[]>();
  const [categories, setCategories] = useState<Category[]>();
  const [bio, setBio] = useState<Bio>();
  const [contactFields, setContactFields] = useState<ContactField[]>();
  const [subCategories, setSubCategories] = useState<SubCategory[]>();


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

  useEffect(() => {
    getSubCategories().then((res) => {
      setSubCategories(res);
    }).catch((err) => {
      toast.error(err.message);
    });
    setRefreshSubCategories(false);
  }, [refreshSubCategories]);
  
  return (
    <>
      <ToastContainer 
        closeOnClick
        theme="dark"
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        draggable
        pauseOnHover
      />
      <Navbar categories={categories} name={bio?.name} />
      <Routes>
        <Route path='/gallery/:slug'>
          <Route path="" element={<Gallery />} />
          <Route path=":sub" element={<Gallery />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin bio={bio} categories={categories} subCategories={subCategories} contactFields={contactFields} 
                                              photos={photos} setRefreshBio={setRefreshBio} setRefreshSubCategories={setRefreshSubCategories} setRefreshCategories={setRefreshCategories} setRefreshContactFields={setRefreshContactFields} setRefreshPhotos={setRefreshPhotos} />} />
        <Route path="/home" element={<Home bio={bio} />} />
        <Route path="/" element={<Home bio={bio} />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
