import React from 'react'
import ImageUploading from 'react-images-uploading';
import { ImageListType } from 'react-images-uploading/dist/typings';
import Button from './Button';

const Uploader = (
    { image, setImage, className, url }: 
    { image: ImageListType | undefined; setImage: (val: ImageListType | undefined) => void; className?: string; url?: string; }
): React.ReactElement => {
  return (
    <ImageUploading
        value={image ?? []}
        onChange={(imageList) => setImage(imageList)}
        maxNumber={1}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className={`upload__image-wrapper ${className ?? ''}`}>
            <button
              className={`border-dotted border-2 rounded-lg py-5 px-3
                ${isDragging ? 'border-primary' : 'border-granite'} 
                ${(image && image?.length > 0) ? 'hidden' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onImageUpload();
              }}
              {...dragProps}
            >
              Upload photo
            </button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item flex flex-col justify-center">
                <img src={image['data_url'] ?? url} alt="" className='mb-2' />
                <div className="image-item__btn-wrapper flex justify-around">
                  <Button mode='secondary' content='Update' onClick={() => onImageUpdate(index)}/>
                  <Button mode='primary' content='Remove' onClick={() => onImageRemove(index)}/>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
  )
}

export default Uploader;