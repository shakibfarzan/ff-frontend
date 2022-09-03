import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components';

const Logout = (): React.ReactElement => {
    const navigate = useNavigate();
  return (
    <div className="flex justify-center gap-4 items-center">
        <p className="text-lg">Are you sure to logout?</p>
        <Button mode={'primary'} content={'Yes'} onClick={() => {
            localStorage.removeItem('access token');
            localStorage.removeItem('refresh token');
            navigate('/login');
        }}/>
    </div>
  )
}

export default Logout;