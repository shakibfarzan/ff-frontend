import React from 'react'
import { deleteOneContactField } from '../../../api/about';
import { Button, Modal } from '../../../components';

const Delete = (
    {isOpen, setIsOpen, id, setRefresh}:
    {isOpen: boolean; setIsOpen: (val: boolean) => void; id: number; setRefresh: (val: boolean) => void}
): React.ReactElement => {
  return (
    <Modal 
        isOpen={isOpen}
        setIsOpen={setIsOpen} 
        title={<p className="text-xl font-semibold text-primary">Delete</p>} 
        content={
            <div className="flex flex-col w-full justify-center gap-4 mt-4">
                <p className="text-center text-lg">
                    Are you sure to delete this contact field?
                </p>
                <div className="flex gap-2">
                    <Button mode="primary" content="Yes" className='w-full' onClick={() => {
                        deleteOneContactField(id);
                        setTimeout(() => {
                            setRefresh(true);
                            setIsOpen(false);
                        }, 500);
                    }}/>
                    <Button mode="secondary" content="No" className='w-full' onClick={() => {
                        setIsOpen(false);
                    }}/>
                </div>
            </div>
        } 
    />
  )
}

export default Delete