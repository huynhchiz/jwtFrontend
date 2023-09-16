import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalDelete({ show, onClose, onSave, user }) {
   return (
      <>
         <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
               <Modal.Title>DELETE THIS USER?</Modal.Title>
            </Modal.Header>
            <Modal.Body>{'Woohoo, are you sure to delete this user: ' + user}</Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={onClose}>
                  Close
               </Button>
               <Button variant="danger" onClick={onSave}>
                  Delete User
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
}

export default ModalDelete;
