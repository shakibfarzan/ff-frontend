import React, { useEffect, useState } from 'react';
import ContactField from '../types/ContactField';
import facebook from '../assets/facebook.svg';
import instagram from '../assets/instagram.svg';
import mail from '../assets/mail.svg';
import phone from '../assets/phone.svg';
import twitter from '../assets/twitter.svg';
import { getContactFields } from '../api/about';
import { toast } from 'react-toastify';
import { useMediaQuery } from 'react-responsive';

const mapObject: Record<string, string> = {
    Instagram: instagram,
    Facebook: facebook,
    Email: mail,
    Phone: phone,
    Twitter: twitter,
}

const Contact = (): React.ReactElement => {
    const [contactFields, setContactFields] = useState<ContactField[]>();
    const isMobile = useMediaQuery({ query: '(max-width: 800px)' });
    const linkMaker = (name: string, link: string): string => {
        if (name === 'Email') {
            return `mailto:${link}`;
        } else if (name === 'Phone') {
            return `tel:${link}`;
        }
        return link;
    };

    useEffect(() => {
      getContactFields().then((res) => {
        setContactFields(res);
      }).catch(() => {
        toast.error('Server error!');
      });
  
    }, []);

  return (
    <div className="flex justify-center mb-16">
        <div className={`w-full justify-around ${isMobile ? 'flex-col' : 'flex '}`}>
            {contactFields?.map(({ name, link, value}) => (
                <div className="flex-col">
                    <div className='flex justify-center'>
                        <a href={linkMaker(name ?? '', link ?? '')} rel="noreferrer" target="_blank">
                            <img className="w-8 cursor-pointer md:w-10 lg:w-12" src={mapObject[name ?? '']} alt={name} />
                        </a>
                    </div>
                    <p className={`flex justify-center font-semibold ${isMobile ? 'mb-6' : ''}`}>{value}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Contact