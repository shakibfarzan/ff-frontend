import axios from "axios";
import { toast } from "react-toastify";

export const login = (username: string, password: string, onSuccess?: () => void) => {
    axios({
        baseURL: process.env.REACT_APP_API_URL,
        data: {
            username,
            password,
        },
        method: 'post',
        url: 'auth/',
    }).then((res) => {
        localStorage.setItem('access token', res.data.access);
        localStorage.setItem('refresh token', res.data.refresh);
        toast.success("Login successful");
        onSuccess && onSuccess();
    }).catch((err) => {
        toast.error("Login failed");
    })
}

export const refreshToken = () => {
    const refteshToken = localStorage.getItem('refresh token');
    axios({
        baseURL: process.env.REACT_APP_API_URL,
        data: {
            refresh: refteshToken
        },
        method: 'post',
        url:'auth/refresh/'
    }).then((res) => {
        localStorage.setItem('access token', res.data.access);
    }).catch((err) => {
        toast.error(err.message);
    })
}

export const logout = () => {
    localStorage.removeItem('access token');
    localStorage.removeItem('refresh token');
}