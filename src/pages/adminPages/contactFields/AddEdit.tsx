import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { createContactField, updateOneContactField } from '../../../api/about';
import { Button, Input, Modal } from '../../../components'
import ContactField from '../../../types/ContactField';

const AddEdit = (
    { isOpen, setIsOpen, contactField, isEdit, setRefresh }: 
    { isOpen: boolean; setIsOpen: (val: boolean) => void; contactField: ContactField | undefined; isEdit: boolean; setRefresh: (val: boolean) => void}
): React.ReactElement => {
    const [formData, setFormData] = useState<ContactField>();

  return (
    <Modal 
        isOpen={isOpen}
        handleClose={() => setFormData(undefined)}
        handleOpen={() => setFormData(contactField)}
        setIsOpen={setIsOpen} 
        title={<p className="text-xl font-semibold">{isEdit ? 'Edit Contact Field' : 'Add Contact Field'}</p>} 
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
                    value={formData?.link}
                    id='link'
                    name='link'
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="Link"
                    type='text'
                    className='border border-secondary shadow-md'
                />
                <Input 
                    value={formData?.value}
                    id='value'
                    name='value'
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    placeholder="Value"
                    type='text'
                    className='border border-secondary shadow-md'              
                />
                <Button mode='secondary' content='Save' onClick={() => {
                    if (!formData?.name || !formData.value || !formData.link) {
                        toast.error('All fields must be filled');
                        return;
                    }
                    if (isEdit) {
                        updateOneContactField(formData?.name ?? '',formData?.value ?? '',formData?.link ?? '',contactField?.id ?? -1);
                    } else {
                        createContactField(formData?.name ?? '',formData?.value ?? '',formData?.link ?? '');
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