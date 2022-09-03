import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJwt } from "react-jwt";
import { login } from '../api/auth';
import { Button, Input } from '../components';

const Login = (): React.ReactElement => {
    const navigate = useNavigate();
    const token = localStorage.getItem('access token');
    const { isExpired, decodedToken } = useJwt(token ?? '');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        if (decodedToken && !isExpired) {
            navigate('/admin');
        }
    }, [decodedToken, isExpired, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
        <div className='p-20 bg-secondary md:w-1/4 shadow-2xl'>
            <p className="text-2xl text-center text-light mb-4">LOG IN</p>
            <form className='flex flex-col gap-4'>
                <Input
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); }}
                    autoFocus
                    id="username" 
                    name="username" 
                    type="text" 
                    placeholder='Username'                   
                />
                <Input 
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); }}
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder='Password'                                          
                />
                <Button mode='primary' content='Submit' onClick={() => { login(username, password, () => { navigate('/admin'); }); } }/>
            </form>
        </div>
    </div>
  )
}

export default Login;