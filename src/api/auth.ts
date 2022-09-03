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

export const logout = () => {
    localStorage.removeItem('token');
}