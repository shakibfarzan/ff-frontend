import React from 'react'
import Category from '../../types/Category';
import Photo from '../../types/Photo';

const Photos = (
    { photos, categories, setRefresh }: 
    { photos: Photo[] | undefined; categories: Category[] | undefined; setRefresh: (val: boolean) => void}
): React.ReactElement => {
  return (
    <div>Photos</div>
  )
}

export default Photos;