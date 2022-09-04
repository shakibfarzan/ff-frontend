import axios from "axios";
import { toast } from "react-toastify";
import Category from "../types/Category";

const url = 'categories/';
const token = `Bearer ${localStorage.getItem('access token')}`;

export const createCategory = (name: string, slug?: string) => {
    axios({
        baseURL: process.env.REACT_APP_API_URL,
        url,
        data: slug ? {
            name,
            slug,
        } : { name },
        headers: {
            'Authorization': token,
        },
        method: 'post',
    }).then(() => {
        toast.success('Category Created Successfully');
    }).catch((err) => {
        toast.error(err.message);
    });
}

export const getCategories = async (): Promise<Category[]> => {
    const { data } = await axios.get(url, {
        baseURL: process.env.REACT_APP_API_URL,
    });
    return data;
}

export const getOneCategory = async (slug: string): Promise<Category> => { 
    const { data } = await axios.get(`${url}${slug}/`,{
        baseURL: process.env.REACT_APP_API_URL,
    });
    return data;
}

export const updateCategory = (id: number, name: string, slug?: string) => {
    axios({
        baseURL: process.env.REACT_APP_API_URL,
        url: `${url}${id}/update/`,
        data: slug ? {
            name,
            slug,
        } : { name },
        headers: {
            'Authorization': token,
        },
        method: 'put',
    }).then(() => {
        toast.success('Category Updated Successfully');
    }).catch((err) => {
        toast.error(err.message);
    });
}

export const deleteCategory = (id: number) => {
    axios({
        baseURL: process.env.REACT_APP_API_URL,
        url: `${url}${id}/delete/`,
        headers: {
            'Authorization': token,
        },
        method: 'delete',
    }).then(() => {
        toast.success('Category Deleted Successfully');
    }).catch((err) => {
        toast.error(err.message);
    });
}