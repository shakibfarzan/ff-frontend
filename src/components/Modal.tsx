import React, { ReactNode } from 'react';
import ReactModal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};
ReactModal.setAppElement('#root');

const Modal = (
    { isOpen, setIsOpen, title, content, handleClose, handleOpen  }:
    { isOpen: boolean; setIsOpen: (val: boolean) => void; title: ReactNode; content: ReactNode; handleClose?: () => void; handleOpen?: () => void},
): React.ReactElement => {

    const onClose = () => {
        setIsOpen(false);
    }

  return (
    <ReactModal 
        isOpen={isOpen} 
        style={customStyles}
        onRequestClose={onClose}
        onAfterClose={handleClose}
        onAfterOpen={handleOpen}
    >
        <div className="flex mb-2 md:w-80 w-60 justify-between">
            {title}
            <button onClick={onClose}>✖</button>
        </div>
        <hr />
        {content}
    </ReactModal>
  )
}

export default Modal;