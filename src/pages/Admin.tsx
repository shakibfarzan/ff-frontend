import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/not-found');
        }
    }, [navigate]);

  return (
    <div>Admin</div>
  )
}

export default Admin