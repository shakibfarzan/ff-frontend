import axios from "axios";
import { toast } from "react-toastify";
import { Photo } from "../types";

const url = 'photos/';

export const getPhotos = async (): Promise<Photo[]> => {
    const { data } = await axios.get(url, {
        baseURL: process.env.REACT_APP_API_URL,
    });
    return data;
}

export const getPhotosByCategory = async (category: string, subCategory?: string): Promise<Photo[]> => { 
    const { data } = await axios.get(!subCategory ? `${url}?slug=${category}` : `${url}?slug=${category}&sub=${subCategory}`, {
        baseURL: process.env.REACT_APP_API_URL,
    });
    return data;
}

export const createPhoto = (src: File, category: number, subCategory: number | null, name?: string) => {
    const formData = new FormData();
    formData.append('src', src);
    formData.append('category', category.toString());
    name && formData.append('name', name);
    subCategory && formData.append('sub_category', subCategory.toString());
    axios({
        baseURL: process.env.REACT_APP_API_URL,
        url,
        data: formData,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access token')}`,
        },
        method: 'post',
    }).then(() => {
        toast.success('Photo Created Successfully');
    }).catch((err) => {
        toast.error(err.message);
    });
}

export const updatePhotoCategory = (id: number, category: number, subCategory: number | null) => {
    axios({
        baseURL: process.env.REACT_APP_API_URL,
        url: `${url}${id}/update/`,
        data: {
            category,
            sub_category: subCategory,
        },
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access token')}`,
        },
        method: 'patch',
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
            'Authorization': `Bearer ${localStorage.getItem('access token')}`,
        },
        method: 'delete',
    }).then(() => {
        toast.success('Photo Deleted Successfully');
    }).catch((err) => {
        toast.error(err.message);
    });
}