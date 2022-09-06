import React from 'react';
import { ColorRing } from 'react-loader-spinner';

const Loader = ({ height, width, className}: { height?: "80"; width?: "80"; className?: string }): React.ReactElement => {
  return (
    <div className={className} >
        <ColorRing
          visible={true}
          height={height}
          width={width}
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#FF423F', '#ff5f5d', '#000F2D', '#001e5b', '#44414B']}
        />  
    </div>

  )
}

export default Loader