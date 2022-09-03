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
import { getBio } from './api/about';

function App(): React.ReactElement {
  const [bio, setBio] = useState<Bio>();
  useEffect(() => {
    getBio().then((res) => {
      setBio(res);
    }).catch(() => {
      toast.error('Server error!');
    });
  }, []);
  return (
    <>
      <ToastContainer 
        closeOnClick
        theme="dark"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar name={bio?.name} />
      <Routes>
        <Route path="/gallery/:slug" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/home" element={<Home bio={bio} />} />
        <Route path="/" element={<Home bio={bio} />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
