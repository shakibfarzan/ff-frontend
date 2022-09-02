import React from 'react';
import Category from '../../types/Category';

const Categories = (
    { categories, setRefresh }: 
    { categories: Category[] | undefined; setRefresh: (val: boolean) => void; }
): React.ReactElement => {
  return (
    <div>Categories</div>
  )
}

export default Categories;