import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './ModalInfoUser.scss';
import { fetchAllUsertype } from '../../../services/usertypeService';

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
   gender,
   usertypeId,
   onChangeEmail,
   onChangePhone,
   onChangeUsername,
   onChangePassword,
   onChangeConfirmPassword,
   onChangeAddress,
   onChangeGender,
   onChangeUserType,
}) {
   let isShowType = type === 'show';
   let isAddType = type === 'add';
   let isEditType = type === 'edit';

   const [listTypes, setListTypes] = useState([]);
   // const [usertypeId, setUsertypeId] = useState();

   useEffect(() => {
      getApiUsertypes();
   }, []);

   const getApiUsertypes = async () => {
      let res = await fetchAllUsertype();

      setListTypes(res.data.DT);
   };

   // const handleChangeUsertype = (e) => {
   //    setUsertypeId(e.target.value);
   // };

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
                        <div className="select-wrapper">
                           {/* gender */}
                           <div className="select-wrapper-item">
                              <label>Gender:</label>
                              <select
                                 disabled={isShowType}
                                 className="select-form"
                                 // value={gender ?? ''}
                                 // onChange={onChangeGender}
                              >
                                 <option defaultValue>Male</option>
                                 <option>Female</option>
                                 <option>Other</option>
                              </select>
                           </div>

                           {/* type user */}
                           <div className="select-wrapper-item">
                              <label>Type</label>
                              <select
                                 className="select-form"
                                 disabled={isShowType}
                                 value={usertypeId}
                                 onChange={onChangeUserType}
                              >
                                 {listTypes.length > 0 &&
                                    listTypes.map((item, idx) => (
                                       <option value={item.id} key={`type-${idx}`}>
                                          {item.description}
                                       </option>
                                    ))}
                              </select>
                           </div>
                        </div>
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
