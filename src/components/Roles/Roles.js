import { useRef, useState } from 'react';
import { useImmer } from 'use-immer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

import './Roles.scss';
import { createNewRoles as createNewRolesService } from '../../services/roleService';
import ModalNoti from '../reuses/ModalNoti/ModalNoti';
import TableRole from './TableRole';

const Roles = () => {
   const tableRoleRef = useRef();

   const initRoleLine = { url: '', description: '', isValidUrl: true };

   // sử dụng useImmer thay cho useState
   // setImmer cung cấp đối số thứ 1 là 1 cái draft clone của state, ta có thể
   // cập nhật clone state đó để ko bị bug, thay vì cập nhật thẳng lên state như của useState..
   const [listRoleLine, setListRoleLine] = useImmer({
      [`line${uuidv4()}`]: initRoleLine,
   });

   const [showNotiModal, setShowNotiModal] = useState({
      isShow: false,
      message: '',
   });

   const handleChangeInput = (key, name, eventvalue) => {
      setListRoleLine((listRoleLineDraft) => {
         listRoleLineDraft[key][name] = eventvalue;

         // check if on Change url => set valid = true
         if (name === 'url') {
            listRoleLineDraft[key].isValidUrl = true;
         }
      });
   };

   const handleAddNewRoleLine = () => {
      setListRoleLine((listRoleLineDraft) => {
         listRoleLineDraft[`line${uuidv4()}`] = initRoleLine;
      });
   };

   const handleDeleteRoleLine = (key) => {
      setListRoleLine((listRoleLineDraft) => {
         delete listRoleLineDraft[key];
      });
   };

   // setup roles data to call api
   const buildDataToPersist = () => {
      let result = [];
      Object.entries(listRoleLine).map(([key, value], index) => {
         return result.push({ url: value.url, description: value.description });
      });

      if (result && result.length > 0) {
         // remove the duplicate urls input
         let finalResult = result.filter(
            (value, index, self) => index === self.findIndex((valueCheck) => valueCheck.name === value.name),
         );

         return finalResult;
      }
   };

   const handleSaveAddRoles = async () => {
      let firstInvalidUrlInput = Object.entries(listRoleLine).find(([key, value], index) => {
         return value.url === '';
      });

      if (firstInvalidUrlInput) {
         // set invalid with un filled url input
         let firstInvalidKey = firstInvalidUrlInput[0];
         setListRoleLine((listRoleLineDraft) => {
            listRoleLineDraft[firstInvalidKey].isValidUrl = false;
         });
      } else {
         // call api create roles
         let data = buildDataToPersist();
         let res = await createNewRolesService(data);

         if (res && +res.EC === 0) {
            console.log(res.EM, res.DT);
            setShowNotiModal({
               isShow: true,
               message: res.EM,
            });

            setListRoleLine({ [`line${uuidv4()}`]: initRoleLine });
            tableRoleRef.current.fetchRoles();
         }
      }
   };

   return (
      <>
         <div className="roles-container">
            <div className="container">
               <div className="add-role-form">
                  <h4 className="add-role-form-title">Add new roles...</h4>

                  {Object.entries(listRoleLine).map(([key, value], index) => {
                     return (
                        <div className="add-role-line" key={`roleline-${index}`}>
                           <div className="role-input-wrapper">
                              <label className="role-label">Url: </label>
                              <input
                                 className={`role-input form-control ${!value.isValidUrl && 'is-invalid'}`}
                                 type="text"
                                 value={value.url}
                                 onChange={(e) => handleChangeInput(key, 'url', e.target.value)}
                              />
                           </div>

                           <div className="role-input-wrapper">
                              <label className="role-label">Description: </label>
                              <input
                                 className="role-input form-control"
                                 type="text"
                                 value={value.description}
                                 onChange={(e) => handleChangeInput(key, 'description', e.target.value)}
                              />
                           </div>

                           <div className="role-actions-wrapper">
                              <FontAwesomeIcon
                                 className="add-role-line-icon"
                                 icon={faCirclePlus}
                                 onClick={handleAddNewRoleLine}
                              />
                              {index >= 1 && (
                                 <FontAwesomeIcon
                                    className="delete-role-line-icon"
                                    icon={faTrashCan}
                                    onClick={() => handleDeleteRoleLine(key)}
                                 />
                              )}
                           </div>
                        </div>
                     );
                  })}

                  <div className="role-add-btn-wrapper">
                     <button className="btn btn-warning add-role-btn" onClick={handleSaveAddRoles}>
                        Save
                     </button>
                  </div>
               </div>

               <div className="list-role-table">
                  <TableRole ref={tableRoleRef} />
               </div>
            </div>
         </div>
         <ModalNoti
            show={showNotiModal.isShow}
            title={'Roles'}
            content={showNotiModal.message}
            onClose={() =>
               setShowNotiModal({
                  isShow: false,
                  message: '',
               })
            }
         />
      </>
   );
};

export default Roles;
