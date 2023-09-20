import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './ModalInfoUser.scss';
import { fetchAllUsertype } from '../../../services/usertypeService';
import { fetchAllGender } from '../../../services/genderService';

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
   genderId,
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
   //
   let isShowType = type === 'show';
   let isAddType = type === 'add';
   let isEditType = type === 'edit';

   const [listTypes, setListTypes] = useState([]);
   const [listGenders, setListGenders] = useState([]);

   const noneSelectOption = [
      {
         id: 0,
         name: 'Select',
         description: 'Select',
      },
   ];

   useEffect(() => {
      getApiUsertypes();
      getApiGenders();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const getApiUsertypes = async () => {
      let res = await fetchAllUsertype();
      if (res && res.data && +res.data.EC === 0) {
         setListTypes(noneSelectOption.concat(res.data.DT));
      }
   };

   const getApiGenders = async () => {
      let res = await fetchAllGender();
      if (res && res.data && +res.data.EC === 0) {
         setListGenders(noneSelectOption.concat(res.data.DT));
      }
   };

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
                           value={genderId ? genderId : 0}
                           onChange={onChangeGender}
                        >
                           {listGenders.length > 0 &&
                              listGenders.map((item, idx) => {
                                 return (
                                    <option hidden={item.id === 0} key={`gender-${idx}`} value={item.id}>
                                       {item.name}
                                    </option>
                                 );
                              })}
                        </select>
                     </div>

                     {/* type user */}
                     <div className="select-wrapper-item">
                        <label>Type</label>
                        <select
                           className="select-form"
                           disabled={isShowType}
                           value={usertypeId ? usertypeId : 0}
                           onChange={onChangeUserType}
                        >
                           {listTypes.length > 0 &&
                              listTypes.map((item, idx) => (
                                 <option hidden={item.id === 0} value={item.id} key={`type-${idx}`}>
                                    {item.description}
                                 </option>
                              ))}
                        </select>
                     </div>
                  </div>
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
