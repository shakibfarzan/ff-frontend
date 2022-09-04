import React, { useState } from 'react'
import { Button, Table } from '../../../components';
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
        <Table 
            dataSource={contactFields} 
            keyIndex={'id'} 
            columns={[
                {
                    dataIndex: 'name',
                    title: 'Name',
                    className: 'text-center',
                },
                {
                    dataIndex: 'link',
                    title: 'Link',
                    className: 'text-center',
                },
                {
                    dataIndex: 'value',
                    title: 'Value',
                    className: 'text-center',
                },
                {
                    dataIndex: 'id',
                    className: 'flex justify-center items-center',
                    render: (id, record): React.ReactNode => (
                        <div className="flex gap-2 my-2">
                            <Button mode="secondary" content='Edit' onClick={() => {
                                setIsAddEditOpen(true);
                                setIsEdit(true);
                                setContactField(new ContactField(id, record?.name, record?.value, record?.link));
                            }} />
                            <Button mode="primary" content='Delete' onClick={() => {
                                setIsDeleteOpen(true);
                                setSelectedId(id);
                            }}/>
                        </div>
                    ),
                }
            ]} 
        />
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