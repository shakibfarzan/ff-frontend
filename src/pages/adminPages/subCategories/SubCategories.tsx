import React, { useEffect, useState } from 'react'
import { Button, CustomImage, Table } from '../../../components';
import { Category, Photo, SubCategory } from '../../../types';
import AddEdit from './AddEdit';
import Delete from './Delete';

const SubCategories = (
    { categories, subCategories, setRefresh }: 
    { categories: Category[] | undefined; subCategories: SubCategory[] | undefined; setRefresh: (val: boolean) => void}
): React.ReactElement => {
  const [isEdit, setIsEdit] = useState(false);
  const [isAddEditOpen, setIsAddEditOpen] = useState<boolean>(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [subCategory, setSubCategory] = useState<SubCategory>();
  const [filteredSubCategory, setFilteredSubCategory] = useState<SubCategory[]>();
  const [selectedId, setSelectedId] = useState<number>();
  const [categoryFilterValue, setCategoryFilterValue] = useState<string>();

  useEffect(() => {
    if (categoryFilterValue === "-1") {
        setFilteredSubCategory(subCategories);
    } else {
        setFilteredSubCategory(subCategories?.filter((p) => p.parent_category?.toString() === categoryFilterValue));
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
                setSubCategory(undefined);
            }}/>
        </div>
        <Table 
            dataSource={!categoryFilterValue ? subCategories : filteredSubCategory} 
            keyIndex={'id'} 
            columns={[
                {
                    dataIndex: 'name',
                    title: 'Name',
                    className: 'text-center',
                },
                {
                    dataIndex: 'parent_category',
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
                                setSubCategory(new SubCategory(record?.name, record?.slug, id, record?.parent_category));
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
            subCategory={subCategory} 
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

export default SubCategories;