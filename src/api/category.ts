import axios from "axios";
import { toast } from "react-toastify";
import { Category, SubCategory } from "../types";

const url = 'categories/';
const parentCategoryUrl = `${url}parent/`;
const subCategoryUrl = `${url}sub/`

export const createCategory = (name: string, slug?: string) => {
    axios({
        baseURL: process.env.REACT_APP_API_URL,
        url: parentCategoryUrl,
        data: slug ? {
            name,
            slug,
        } : { name },
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access token')}`,
        },
        method: 'post',
    }).then(() => {
        toast.success('Category Created Successfully');
    }).catch((err) => {
        toast.error(err.message);
    });
}

export const getCategories = async (): Promise<Category[]> => {
    const { data } = await axios.get(parentCategoryUrl, {
        baseURL: process.env.REACT_APP_API_URL,
    });
    return data;
}

export const getOneCategory = async (slug: string): Promise<Category> => { 
    const { data } = await axios.get(`${parentCategoryUrl}${slug}/`,{
        baseURL: process.env.REACT_APP_API_URL,
    });
    return data;
}

export const updateCategory = (id: number, name: string, slug?: string) => {
    axios({
        baseURL: process.env.REACT_APP_API_URL,
        url: `${parentCategoryUrl}${id}/update/`,
        data: slug ? {
            name,
            slug,
        } : { name },
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access token')}`,
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
        url: `${parentCategoryUrl}${id}/delete/`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access token')}`,
        },
        method: 'delete',
    }).then(() => {
        toast.success('Category Deleted Successfully');
    }).catch((err) => {
        toast.error(err.message);
    });
}

export const getSubCategories = async (): Promise<SubCategory[]> => {
    const { data } = await axios.get(subCategoryUrl, {
        baseURL: process.env.REACT_APP_API_URL,
    });
    return data;
}

export const createSubCategory = (name: string, category: number, slug?: string) => {
    axios({
        baseURL: process.env.REACT_APP_API_URL,
        url: subCategoryUrl,
        data: slug ? {
            name,
            slug,
            parent_category: category,
        } : { name, parent_category: category },
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access token')}`,
        },
        method: 'post',
    }).then(() => {
        toast.success('Sub Category Created Successfully');
    }).catch((err) => {
        toast.error(err.message);
    });
}

export const  updateSubCategory = (id: number, category: number, name: string, slug?: string) => {
    axios({
        baseURL: process.env.REACT_APP_API_URL,
        url: `${subCategoryUrl}${id}/update/`,
        data: slug ? {
            name,
            parent_category: category,
        } : { name, parent_category: category },
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access token')}`,
        },
        method: 'put',
    }).then(() => {
        toast.success('Sub Category Updated Successfully');
    }).catch((err) => {
        toast.error(err.message);
    });
}

export const deleteSubCategory = (id: number) => {
    axios({
        baseURL: process.env.REACT_APP_API_URL,
        url: `${subCategoryUrl}${id}/delete/`,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access token')}`,
        },
        method: 'delete',
    }).then(() => {
        toast.success('Category Deleted Successfully');
    }).catch((err) => {
        toast.error(err.message);
    });
}