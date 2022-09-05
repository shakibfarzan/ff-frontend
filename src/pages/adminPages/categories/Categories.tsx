import React, { useState } from 'react';
import { Button, Table } from '../../../components';
import { Category } from '../../../types';
import AddEdit from './AddEdit';
import Delete from './Delete';

const Categories = (
    { categories, setRefresh }: 
    { categories: Category[] | undefined; setRefresh: (val: boolean) => void; }
): React.ReactElement => {
  const [isEdit, setIsEdit] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [category, setCategory] = useState<Category>();
  const [selectedId, setSelectedId] = useState<number>();
  return (
    <div className="w-full">
        <div className="w-full flex justify-end mb-4">
            <Button mode="secondary" content='Add' onClick={() => {
                setIsEdit(false);
                setIsAddEditOpen(true);
                setCategory(undefined);
            }}/>
        </div>
        <Table 
            dataSource={categories} 
            keyIndex={'id'} 
            columns={[
                {
                    dataIndex: 'name',
                    title: 'Name',
                    className: 'text-center',
                },
                {
                    dataIndex: 'slug',
                    title: 'Slug',
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
                                setCategory(new Category(record?.name, record?.slug, id));
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
            category={category} 
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

export default Categories;