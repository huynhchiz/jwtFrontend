import './ModalInfoUser.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalInfoUser({
   show,
   onClose,
   onSaveAdd,
   onSaveUpdate,
   type = 'show',
   email,
   username,
   phone,
   password,
   confirmpassword,
   address,
   onChangeEmail,
   onChangePhone,
   onChangeUsername,
   onChangePassword,
   onChangeConfirmPassword,
   onChangeAddress,
}) {
   let isShowType = type === 'show';
   let isAddType = type === 'add';
   let isEditType = type === 'edit';

   return (
      <>
         <Modal show={show} onHide={onClose} size="lg">
            <Modal.Header closeButton>
               <Modal.Title>
                  {isShowType && 'INFOR USER'}
                  {isAddType && 'ADD NEW USER'}
                  {isEditType && 'EDIT USER'}
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <div className="user-form">
                  {/* email */}
                  <div className="input-wrapper">
                     <label>Email:</label>
                     <input
                        disabled={isShowType}
                        className="input-form"
                        type="text"
                        name="email"
                        value={email ?? ''}
                        onChange={onChangeEmail}
                     />
                  </div>

                  {/* phone */}
                  <div className="input-wrapper">
                     <label>Phone number:</label>
                     <input
                        disabled={isShowType}
                        className="input-form"
                        type="text"
                        name="phone"
                        value={phone ?? ''}
                        onChange={onChangePhone}
                     />
                  </div>

                  {/* user name */}
                  <div className="input-wrapper">
                     <label>Your name:</label>
                     <input
                        disabled={isShowType}
                        className="input-form"
                        type="text"
                        name="username"
                        value={username ?? ''}
                        onChange={onChangeUsername}
                     />
                  </div>

                  {/* password + confirm password */}
                  {isAddType && (
                     <>
                        <div className="input-wrapper">
                           <label>Password:</label>
                           <input
                              className="input-form"
                              type="password"
                              name="password"
                              value={password ?? ''}
                              onChange={onChangePassword}
                           />
                        </div>
                        <div className="input-wrapper">
                           <label>Confirm password:</label>
                           <input
                              className="input-form"
                              type="password"
                              name="confirmpassword"
                              value={confirmpassword ?? ''}
                              onChange={onChangeConfirmPassword}
                           />
                        </div>
                     </>
                  )}

                  {!isAddType && (
                     <>
                        {' '}
                        {/* address */}
                        <div className="input-wrapper">
                           <label>Address:</label>
                           <input
                              disabled={isShowType}
                              className="input-form"
                              type="text"
                              name="address"
                              value={address ?? ''}
                              onChange={onChangeAddress}
                           />
                        </div>
                        {/* gender */}
                        <div className="input-wrapper">
                           <label>Gender:</label>
                        </div>
                        {/* type user */}
                     </>
                  )}
               </div>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={onClose}>
                  Close
               </Button>

               {isAddType && (
                  <Button variant="primary" onClick={onSaveAdd}>
                     Add User
                  </Button>
               )}
               {isEditType && (
                  <Button variant="primary" onClick={onSaveUpdate}>
                     Update User
                  </Button>
               )}
            </Modal.Footer>
         </Modal>
      </>
   );
}

export default ModalInfoUser;
