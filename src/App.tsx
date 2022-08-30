import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getBio } from './api/about';
import './App.css';

function App(): React.ReactElement {
  getBio().then((res) => {
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
