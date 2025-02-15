import React, { useEffect, useState } from 'react'
import { Button, CustomImage, Table } from '../../../components';
import { Category, Photo, SubCategory } from '../../../types';
import AddEdit from './AddEdit';
import Delete from './Delete';

const Photos = (
    { photos, categories, subCategories, setRefresh }: 
    { photos: Photo[] | undefined; categories: Category[] | undefined; subCategories: SubCategory[] | undefined; setRefresh: (val: boolean) => void}
): React.ReactElement => {
  const [isEdit, setIsEdit] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [photo, setPhoto] = useState<Photo>();
  const [filteredPhotos, setFilteredPhotos] = useState<Photo[]>();
  const [selectedId, setSelectedId] = useState<number>();
  const [categoryFilterValue, setCategoryFilterValue] = useState<string>();

  useEffect(() => {
    if (categoryFilterValue === "-1") {
        setFilteredPhotos(photos);
    } else {
        setFilteredPhotos(photos?.filter((p) => p.category?.toString() === categoryFilterValue));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilterValue]);

  return (
    <div className="w-full">
        <div className="w-full flex items-center justify-end gap-4 mb-4">
            <p>Category: </p>
            <select 
              placeholder='Category'
              value={categoryFilterValue}
              className="outline-none border border-secondary p-2 shadow-md cursor-pointer"
              onChange={(e) => setCategoryFilterValue(e.target.value)}>
              {(categories ? [{ name: 'All', slug: 'all', id: -1}, ...categories] : [{ name: 'All', slug: 'all', id: -1}])?.map((c) => (
                <option value={c.id?.toString()} key={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <Button mode="secondary" content='Add' onClick={() => {
                setIsEdit(false);
                setIsAddEditOpen(true);
                setPhoto(undefined);
            }}/>
        </div>
        <Table 
            dataSource={!categoryFilterValue ? photos : filteredPhotos} 
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
                    dataIndex: 'sub_category',
                    title: 'Sub Category',
                    className: 'text-center',
                    render: (value) => (
                      value ? subCategories?.find((c) => c.id === value)?.name : '__'
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
                                setPhoto(new Photo(id, record?.name, record?.src, record?.category, record?.sub_category));
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
            subCategories={subCategories}
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