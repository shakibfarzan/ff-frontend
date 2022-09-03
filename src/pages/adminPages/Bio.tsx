import React, { useEffect, useState } from 'react';
import { ImageListType } from 'react-images-uploading/dist/typings';
import { toast } from 'react-toastify';
import { createUpdateBio } from '../../api/about';
import { Button, Input, Uploader } from '../../components';
import BioType from '../../types/Bio'; 

const Bio = (
    { bio, setRefresh }: 
    { bio: BioType | undefined; setRefresh: (val: boolean) => void; }
): React.ReactElement => {

  const [formData, setFormData] = useState<Omit<BioType, 'profile'> | undefined>(bio);
  const [image, setImage] = useState<ImageListType | undefined>([]);
  const url = `${process.env.REACT_APP_URL}${bio?.profile}`;
  useEffect(() => {
    fetch(url).then((res) => {
      res.arrayBuffer().then((buf) => {
        const file = new File([buf], "profile.jpg");
        setImage([{ file }]);
      })
    })
  }, [url])

  return (
    <div className='lg:grid-cols-2 grid gap-12 mb-12'>
      <div className="flex flex-col gap-6">
        <Input
          autoFocus
          type='text'
          placeholder='Name'
          value={formData?.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border-2 border-secondary shadow-2xl"
        />
        <Uploader 
          image={image} 
          setImage={setImage} 
          className="flex justify-center" 
          url={url}
        />
      </div>
      <div className="flex flex-col gap-12">
        <textarea 
          name="bio" 
          id="bio" 
          rows={5} 
          value={formData?.bio} 
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          className="outline-none border-2 border-secondary text-sm px-2 py-2 h-52 resize-none"
        />
        <Button mode="secondary" content='Save' onClick={() => {
          if (!formData?.name || !formData.bio || image?.length === 0 || !image || !image[0].file) {
            toast.error("All fields are required!");
            return;
          }
          createUpdateBio(formData.name, formData.bio, image[0].file);
          setTimeout(() => {
            setRefresh(true);
          }, 100);
        }} />
      </div>
    </div>
  )
}

export default Bio;