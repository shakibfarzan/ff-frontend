import React, { useState } from 'react'
import { ImageListType } from 'react-images-uploading';
import { toast } from 'react-toastify';
import { createPhoto, updatePhotoCategory } from '../../../api/photo';
import { Button, Input, Modal, Uploader } from '../../../components';
import { Category, Photo } from '../../../types';

const AddEdit = (
    { isOpen, setIsOpen, photo, isEdit, setRefresh, categories }: 
    { isOpen: boolean; setIsOpen: (val: boolean) => void; photo: Photo | undefined; isEdit: boolean; setRefresh: (val: boolean) => void; categories: Category[] | undefined }
) => {
  const [formData, setFormData] = useState<Omit<Photo, 'src'>>();
  const [image, setImage] = useState<ImageListType | undefined>([]);

  return (
    <Modal 
        isOpen={isOpen}
        handleClose={() => {
          setFormData(undefined);
          setImage([]);
        }}
        handleOpen={() => {
          if (categories && categories.length > 0 && !isEdit) {
            setFormData({...formData, category: categories[0].id});
          } else setFormData(photo);
        }}
        setIsOpen={setIsOpen} 
        title={<p className="text-xl font-semibold">{isEdit ? 'Edit Photo' : 'Add Photo'}</p>} 
        content={
            <form className="flex flex-col gap-4 mt-4">
                {!isEdit && <>
                  <div className="flex justify-center">
                    <Uploader 
                      image={image} 
                      setImage={setImage} 
                      className={image && image?.length > 0 ? 'w-60' : ''}
                    />
                  </div>
                  <Input 
                      value={formData?.name}
                      autoFocus
                      id='name'
                      name='name'
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Name" 
                      type='text'
                      className='border border-secondary shadow-md'
                  />
                </>}
                <select 
                  placeholder='Category'
                  value={formData?.category?.toString()}
                  className="outline-none border border-secondary p-2 shadow-md cursor-pointer"
                  onChange={(e) => setFormData({ ...formData, category: parseInt(e.target.value) })}>
                  {categories?.map((c) => (
                    <option value={c.id?.toString()} key={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <Button mode='secondary' content='Save' onClick={() => {
                    if (!formData?.name) {
                        toast.error('Please fill name');
                        return;
                    }
                    if (!formData?.category) {
                        toast.error('Please select a category');
                        return;
                    }
                    if (!isEdit && (image?.length === 0 || !image || !image[0].file)) {
                        toast.error('Please choose a photo');
                        return;
                    }
                    if (isEdit) {
                        updatePhotoCategory(photo?.id ?? -1, formData.category);
                    } else if(image && image[0].file){
                       createPhoto(image[0].file, formData.category, formData.name);
                    }
                    setTimeout(() => {
                        setRefresh(true);
                        setIsOpen(false);
                    }, 500);
                }}/>
            </form>
        } 
    />
  )
}

export default AddEdit;