import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCategories, getOneCategory } from './api/category';
import './App.css';

function App(): React.ReactElement {
  getOneCategory('fashion').then((res) => {
    console.log(res);
  })
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
      <p className="text-2xl text-secondary font-extrabold">Shakib</p>
    </>
  );
}

export default App;
