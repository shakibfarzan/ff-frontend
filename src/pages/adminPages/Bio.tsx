import React from 'react';
import BioType from '../../types/Bio'; 

const Bio = (
    { bio, setRefresh }: 
    { bio: BioType | undefined; setRefresh: (val: boolean) => void; }
): React.ReactElement => {
  return (
    <div>Bio</div>
  )
}

export default Bio;