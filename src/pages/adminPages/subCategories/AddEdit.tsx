import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { createSubCategory, updateSubCategory } from '../../../api/category';
import { Button, Input, Modal } from '../../../components';
import { Category, SubCategory } from '../../../types';

const AddEdit = (
    { isOpen, setIsOpen, subCategory, isEdit, setRefresh, categories }: 
    { isOpen: boolean; setIsOpen: (val: boolean) => void; subCategory: SubCategory | undefined; isEdit: boolean; setRefresh: (val: boolean) => void; categories: Category[] | undefined;}
) => {
  const [formData, setFormData] = useState<SubCategory>();

  return (
    <Modal 
        isOpen={isOpen}
        handleClose={() => {
          setFormData(undefined);
        }}
        handleOpen={() => {
          if (categories && categories.length > 0 && !isEdit) {
             setFormData({...formData, parent_category: categories[0].id });
          } else setFormData(subCategory);
        }}
        setIsOpen={setIsOpen} 
        title={<p className="text-xl font-semibold">{isEdit ? 'Edit Sub Category' : 'Add Sub Category'}</p>} 
        content={
            <form className="flex flex-col gap-4 mt-4">
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
                <Input
                    value={formData?.slug}
                    id='slug'
                    name='slug'
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="Slug (optional)"
                    type='text'
                    className='border border-secondary shadow-md'
                />
                <select 
                  placeholder='Category'
                  value={formData?.parent_category?.toString()}
                  className="outline-none border border-secondary p-2 shadow-md cursor-pointer"
                  onChange={(e) => setFormData({ ...formData, parent_category: parseInt(e.target.value) })}>
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
                    if (!formData?.parent_category) {
                        toast.error('Please select a category');
                        return;
                    }
                    if (isEdit) {
                        updateSubCategory(subCategory?.id ?? -1, formData.parent_category, formData.name, formData.slug);
                    } else {
                        createSubCategory(formData.name, formData.parent_category, formData.slug);
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