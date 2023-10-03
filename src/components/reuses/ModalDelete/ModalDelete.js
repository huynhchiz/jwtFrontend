import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDelete({ show, onClose, onSave, user, title }) {
   return (
      <>
         <Modal show={show} onHide={onClose} size="sm">
            <Modal.Header closeButton>
               <Modal.Title>{title || `DELETE THIS USER?`}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{'Woohoo, are you sure to delete : ' + user}</Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={onClose}>
                  Close
               </Button>
               <Button variant="danger" onClick={onSave}>
                  Delete
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
}

export default ModalDelete;
