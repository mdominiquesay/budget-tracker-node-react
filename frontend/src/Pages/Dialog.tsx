import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export interface DialogDetails
{
    Button:string;
    Title:string;
    Body:JSX.Element; 
    Close:string;
    Save:string;
}
export function Dialog({ DialogDetails, onSubmit,onClose }: { DialogDetails: DialogDetails; onSubmit: () => Promise<void> ; onClose: () => void ;  }) {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    
    const handleSubmit = async() => {
        await onSubmit();
        setShow(false);
    };
    const handleClose = async() => {
      onClose();
      setShow(false);
  };
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          {DialogDetails.Button}
        </Button>
  
        <Modal show={show} animation={false} >
          <Modal.Header closeButton>
            <Modal.Title>{DialogDetails.Title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{DialogDetails.Body}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            {DialogDetails.Close}
            </Button>
            <Button variant="primary"  onClick={handleSubmit}>
            {DialogDetails.Save}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  
}
