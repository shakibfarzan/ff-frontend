import React, { useState } from 'react'
import { Button } from '../../../components';
import ContactField from '../../../types/ContactField';
import AddEdit from './AddEdit';
import Delete from './Delete';

const ContactFields = (
    { contactFields, setRefresh }: 
    { contactFields: ContactField[] | undefined; setRefresh: (val: boolean) => void}
): React.ReactElement => {
    const [isEdit, setIsEdit] = useState(false);
    const [isAddEditOpen, setIsAddEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [contactField, setContactField] = useState<ContactField>();
    const [selectedId, setSelectedId] = useState<number>();

  return (
    <div className="w-full">
        <div className="w-full flex justify-end mb-4">
            <Button mode="secondary" content='Add' onClick={() => {
                setIsEdit(false);
                setIsAddEditOpen(true);
                setContactField(undefined);
            }}/>
        </div>
        <div className='w-full overflow-auto'>
            <table className="w-full">
                <thead>
                    <tr className="border-y-2 border-secondary-light">
                        <th className='p-3'>
                            Name
                        </th>
                        <th>
                            Link
                        </th>
                        <th>
                            Value
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {contactFields?.map(({ id, name, value, link}) => (
                        <tr key={id} className='border-b-2'>
                            <td className='text-center p-3'>
                                {name}
                            </td>
                            <td className='text-center p-3'>
                                {link}
                            </td>
                            <td className='text-center p-3'>
                                {value}
                            </td>
                            <td className="flex justify-center items-center">
                                <div className="flex gap-2 my-2">
                                    <Button mode="secondary" content='Edit' onClick={() => {
                                        setIsAddEditOpen(true);
                                        setIsEdit(true);
                                        setContactField(new ContactField(id, name, value, link));
                                    }} />
                                    <Button mode="primary" content='Delete' onClick={() => {
                                        setIsDeleteOpen(true);
                                        setSelectedId(id);
                                    }}/>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
        </div>
        <AddEdit 
            isOpen={isAddEditOpen} 
            setIsOpen={setIsAddEditOpen} 
            contactField={contactField} 
            isEdit={isEdit} 
            setRefresh={setRefresh} 
        />
        <Delete 
            isOpen={isDeleteOpen} 
            setIsOpen={setIsDeleteOpen} 
            id={selectedId ?? -1} 
            setRefresh={setRefresh}            
        />
    </div>
  )
}

export default ContactFields;