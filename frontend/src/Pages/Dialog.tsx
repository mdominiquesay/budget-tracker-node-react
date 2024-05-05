import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
interface DialogDetails
{
    Button:string;
    Title:string;
    Body:JSX.Element; 
    Close:string;
    Save:string;
}
function Example({ DialogDetails, onSubmit }: { DialogDetails: DialogDetails; onSubmit: () => Promise<void> ;  }) {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    
    const handleClose = () => setShow(false);
    const handleSubmit = async() => {
        await onSubmit();
        setShow(false);
    };
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          {DialogDetails.Button}
        </Button>
  
        <Modal show={show} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>{DialogDetails.Title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{DialogDetails.Body}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            {DialogDetails.Close}
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
            {DialogDetails.Save}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  
}

export default Example;