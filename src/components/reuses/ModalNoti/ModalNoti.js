import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalNoti({ title, content, show, onClose }) {
   return (
      <>
         <Modal show={show} onHide={onClose} size="sm" animation={false}>
            <Modal.Header closeButton>
               <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{content}</Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={onClose}>
                  Close
               </Button>
            </Modal.Footer>
         </Modal>
      </>
   );
}

export default ModalNoti;
