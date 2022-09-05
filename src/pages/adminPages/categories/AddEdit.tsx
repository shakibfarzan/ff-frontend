import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { createCategory, updateCategory } from '../../../api/category';
import { Button, Input, Modal } from '../../../components';
import { Category } from '../../../types';

const AddEdit = (
    { isOpen, setIsOpen, category, isEdit, setRefresh }: 
    { isOpen: boolean; setIsOpen: (val: boolean) => void; category: Category | undefined; isEdit: boolean; setRefresh: (val: boolean) => void}
): React.ReactElement => {
    const [formData, setFormData] = useState<Category>();
    
  return (
    <Modal 
        isOpen={isOpen}
        handleClose={() => setFormData(undefined)}
        handleOpen={() => setFormData(category)}
        setIsOpen={setIsOpen} 
        title={<p className="text-xl font-semibold">{isEdit ? 'Edit Category' : 'Add Category'}</p>} 
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
                <Button mode='secondary' content='Save' onClick={() => {
                    if (!formData?.name) {
                        toast.error('Name field is required');
                        return;
                    }
                    if (isEdit) {
                        updateCategory(category?.id ?? -1, formData.name, formData.slug);
                    } else {
                        createCategory(formData.name, formData.slug);
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

export default AddEdit