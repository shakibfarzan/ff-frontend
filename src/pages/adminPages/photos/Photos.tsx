import React, { useState } from 'react'
import { Button, CustomImage, Table } from '../../../components';
import { Category, Photo } from '../../../types';
import AddEdit from './AddEdit';
import Delete from './Delete';

const Photos = (
    { photos, categories, setRefresh }: 
    { photos: Photo[] | undefined; categories: Category[] | undefined; setRefresh: (val: boolean) => void}
): React.ReactElement => {
  const [isEdit, setIsEdit] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [photo, setPhoto] = useState<Photo>();
  const [selectedId, setSelectedId] = useState<number>();

  return (
    <div className="w-full">
        <div className="w-full flex justify-end mb-4">
            <Button mode="secondary" content='Add' onClick={() => {
                setIsEdit(false);
                setIsAddEditOpen(true);
                setPhoto(undefined);
            }}/>
        </div>
        <Table 
            dataSource={photos} 
            keyIndex={'id'} 
            columns={[
                {
                    dataIndex: 'src',
                    title: 'Image',
                    className: 'md:w-1/6 sm:w-1/2',
                    render: (value, record, index) => (
                      <CustomImage 
                        images={photos?.map((ph) => ({ src: ph.src ?? '', alt: ph.name ?? '' }))} 
                        currentIndex={index}
                        src={value}
                        alt={record?.name}
                      />
                    )
                },
                {
                    dataIndex: 'name',
                    title: 'Name',
                    className: 'text-center',
                },
                {
                    dataIndex: 'category',
                    title: 'Category',
                    className: 'text-center',
                    render: (value) => (
                      categories?.find((c) => c.id === value)?.name
                    )
                },
                {
                    dataIndex: 'id',
                    className: 'h-full',
                    render: (id, record): React.ReactNode => (
                        <div className="flex gap-2 justify-center my-2">
                            <Button mode="secondary" content='Edit' onClick={() => {
                                setIsAddEditOpen(true);
                                setIsEdit(true);
                                setPhoto(new Photo(id, record?.name, record?.src, record?.category));
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
            photo={photo} 
            isEdit={isEdit} 
            setRefresh={setRefresh}
            categories={categories}
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

export default Photos;