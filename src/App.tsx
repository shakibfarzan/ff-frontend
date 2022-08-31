import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Admin from './pages/Admin';

function App(): React.ReactElement {
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
      <Routes>
        <Route path="/gallery/:slug" element={<Gallery />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
