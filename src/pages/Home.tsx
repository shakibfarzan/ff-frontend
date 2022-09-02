import React, { useEffect, useState } from 'react';
import Bio from '../types/Bio';
import ContactField from '../types/ContactField';
import { getContactFields } from '../api/about';
import { toast } from 'react-toastify';

const Home = ({ bio }: { bio: Bio | undefined }): React.ReactElement => {
  const [contactFields, setContactFields] = useState<ContactField[]>();

  useEffect(() => {
    getContactFields().then((res) => {
      setContactFields(res);
    }).catch(() => {
      toast.error('Server error!');
    });

  }, []);

  return (
    <div className="mt-28 lg:grid-cols-2 grid flex-1 gap-12">
        <img style={{ pointerEvents: 'none' }} src={`${process.env.REACT_APP_URL}${bio?.profile}`} alt="Me" className='shadow-2xl'/>
        <div className='bg-granite bg-opacity-20 lg:p-20 md:p-14 p-10 shadow-2xl'>
          <p className="text-dark-liver lg:text-2xl md:text-xl text-lg font-semibold md:leading-10 leading-6 font-kalam drop-shadow-2xl">{bio?.bio}</p>
        </div>
    </div>
  )
}

export default Home