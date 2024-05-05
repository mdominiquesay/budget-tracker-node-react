import React from 'react';
interface PopupDialogProps {
    onClose: any;
}

const ModalContent: React.FC<PopupDialogProps> = ({ onClose }) => {
    return (
        <div className="modal-dialog modal-dialog-centered   modal-dialog-scrollable">
            <div>I'm a modal dialog</div>
            <button onClick={onClose}>Close</button>
        </div>
    );
}
export default ModalContent;
