import axios from "axios";
import { toast } from "react-toastify";
import Photo from "../types/Photo";

const url = 'photos/';
const token = `Bearer ${localStorage.getItem('access token')}`;

export const getPhotos = async (): Promise<Photo[]> => {
    const { data } = await axios.get(url, {
        baseURL: process.env.REACT_APP_API_URL,
    });
    return data;
}

export const getPhotosByCategory = async (category: string): Promise<Photo[]> => { 
    const { data } = await axios.get(`${url}?slug=${category}`, {
        baseURL: process.env.REACT_APP_API_URL,
    });
    return data;
}

export const createPhoto = (src: File, category: number, name?: string) => {
    const formData = new FormData();
    formData.append('src', src);
    formData.append('category', category.toString());
    name && formData.append('name', name);
    axios({
        baseURL: process.env.REACT_APP_API_URL,
        url,
        data: formData,
        headers: {
            'Authorization': token,
        },
        method: 'post',
    }).then(() => {
        toast.success('Photo Created Successfully');
    }).catch((err) => {
        toast.error(err.message);
    });
}

export const deletePhoto = (id: number) => {
    axios({
        baseURL: process.env.REACT_APP_API_URL,
        url: `${url}${id}/`,
        headers: {
            'Authorization': token,
        },
        method: 'delete',
    }).then(() => {
        toast.success('Photo Deleted Successfully');
    }).catch((err) => {
        toast.error(err.message);
    });
}