import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuidv4 } from 'uuid';

import './Roles.scss';
import { useImmer } from 'use-immer';

const Roles = () => {
   // sử dụng useImmer thay cho useState
   // setImmer cung cấp đối số thứ 1 là 1 cái draft clone của state, ta có thể
   // cập nhật clone state đó để ko bị bug, thay vì cập nhật thẳng lên state như của useState..
   const [listRoleLine, setListRoleLine] = useImmer({
      [`line${uuidv4()}`]: { url: '', description: '' },
   });

   const handleChangeInput = (key, name, value) => {
      setListRoleLine((listRoleLineDraft) => {
         listRoleLineDraft[key][name] = value;
      });
   };

   const handleAddNewRoleLine = () => {
      setListRoleLine((listRoleLineDraft) => {
         listRoleLineDraft[`line${uuidv4()}`] = { url: '', description: '' };
      });
   };

   const handleDeleteRoleLine = (key) => {
      setListRoleLine((listRoleLineDraft) => {
         delete listRoleLineDraft[key];
      });
   };

   const handleAddNewRoles = () => {
      console.log(listRoleLine);
   };

   return (
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
                              className="role-input"
                              type="text"
                              value={value.url}
                              onChange={(e) => handleChangeInput(key, 'url', e.target.value)}
                           />
                        </div>

                        <div className="role-input-wrapper">
                           <label className="role-label">Description: </label>
                           <input
                              className="role-input"
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
                  <button className="btn btn-primary add-role-btn" onClick={handleAddNewRoles}>
                     Add
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Roles;
