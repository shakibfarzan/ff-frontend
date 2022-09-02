import React from 'react';
import { Contact } from '../components';
import Bio from '../types/Bio';

const Home = ({ bio }: { bio: Bio | undefined }): React.ReactElement => {

  return (
    <div className="mt-28">
      <div className="lg:grid-cols-2 grid flex-1 gap-12 mb-16">
        <img style={{ pointerEvents: 'none' }} src={`${process.env.REACT_APP_URL}${bio?.profile}`} alt="Me" className='shadow-2xl'/>
        <div className='bg-granite bg-opacity-20 lg:p-20 md:p-14 p-10 shadow-2xl'>
          <p className="text-dark-liver lg:text-2xl md:text-xl text-lg font-semibold md:leading-10 leading-6 font-kalam drop-shadow-2xl">{bio?.bio}</p>
        </div>
      </div>
      <Contact />
    </div> 
  )
}

export default Home