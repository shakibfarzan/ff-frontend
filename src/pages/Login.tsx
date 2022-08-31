import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { Button } from '../components';

const Login = (): React.ReactElement => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/admin');
        }
    }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
        <div className='p-20 bg-secondary md:w-1/4 shadow-2xl'>
            <p className="text-2xl text-center text-light mb-4">LOG IN</p>
            <form className='flex flex-col gap-4'>
                <input 
                       value={username}
                       onChange={(e) => { setUsername(e.target.value); }}
                       autoFocus 
                       className='block text-sm px-2 py-2 outline-none text-secondary' 
                       id="username" 
                       name="username" 
                       type="text" 
                       placeholder='Username'
                />
                <input 
                       value={password}
                       onChange={(e) => { setPassword(e.target.value); }}
                       className='block text-sm px-2 py-2 outline-none text-secondary' 
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