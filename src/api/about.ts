import axios from "axios";
import { toast } from "react-toastify";
import { Bio, ContactField } from "../types";

const contactFieldUrl = 'about/contact-fields/';
const bioUrl = 'about/bio/';

export const createContactField = (name: string, value: string, link: string) => {
    axios({
        baseURL: process.env.REACT_APP_API_URL,
        data: {
            name,
            value,
            link,
        },
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access token')}`,
        },
        url: contactFieldUrl,
        method: 'post',
    }).then(() => {
        toast.success('Contact Field Added Successfully');
    }).catch((err) => {
        toast.error(err.data);
    });
}

export const getContactFields = async (): Promise<Array<ContactField>> => {
    const { data } = await axios.get(contactFieldUrl, {
        baseURL: process.env.REACT_APP_API_URL,
    });
    return data;
}

export const getOneContactField = async (id: number): Promise<ContactField> => {
    const { data } = await axios.get(`${contactFieldUrl}${id}/`, {
        baseURL: process.env.REACT_APP_API_URL,
    });
    return data;
}

export const updateOneContactField = (name: string, value: string, link: string, id: number) => {
    axios({
        baseURL: process.env.REACT_APP_API_URL,
        data: {
            name,
            value,
            link,
        },
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access token')}`,
        },
        url: `${contactFieldUrl}${id}/`,
        method: 'put',
    }).then(() => {
        toast.success('Contact Field Updated Successfully');
    }).catch((err) => {
        toast.error(err.message);
    });
}

export const deleteOneContactField = (id: number) => {
    axios({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access token')}`,
        },
        url: `${contactFieldUrl}${id}/`,
        method: 'delete',
    }).then(() => {
        toast.success('Contact Field Deleted Successfully');
    }).catch((err) => {
        toast.error(err.message);
    });
}

export const getBio = async (): Promise<Bio> => {
    const { data } = await axios.get(bioUrl, {
        baseURL: process.env.REACT_APP_API_URL,
    });
    return data;
}

export const createUpdateBio = (name: string, bio: string, profile: File) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('profile', profile);
    axios({
        baseURL: process.env.REACT_APP_API_URL,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access token')}`,
        },
        url: bioUrl,
        method: 'put',
        data: formData,
    }).then(() => {
        toast.success('Bio Updated Successfully');
    }).catch((err) => {
        toast.error(err.message);
    });
}