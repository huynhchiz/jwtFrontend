import { useEffect, useState } from 'react';
import { useImmer } from 'use-immer';

import './UsertypeRoles.scss';
import { fetchAllUsertype } from '../../services/usertypeService';
import { getRolesByUsertype, readRoles, assignRolesToUsertype } from '../../services/roleService';
import ModalNoti from '../reuses/ModalNoti/ModalNoti';

const UsertypeRoles = () => {
   const noneSelectOption = [
      {
         id: 0,
         name: 'Select',
         description: 'Select',
      },
   ];

   const [allRoles, setAllRoles] = useState([]);
   const [selectedUtId, setSelectedUtId] = useState('');
   const [listTypes, setListTypes] = useState([]);
   const [listRolesByUT, setListRolesByUT] = useImmer([]);

   const [showModalSuccess, setShowModalSuccess] = useState({
      isShow: false,
      message: '',
   });

   useEffect(() => {
      getApiUsertypes();
      getApiAllRole();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const getApiAllRole = async () => {
      let res = await readRoles();

      if (res && +res.EC === 0) {
         setAllRoles(res.DT.allRoles);
      }
   };

   const getApiUsertypes = async () => {
      let res = await fetchAllUsertype();
      if (res && +res.EC === 0) {
         setListTypes(noneSelectOption.concat(res.DT));
      }
   };

   const getApiRolesByUserType = async (id) => {
      let res = await getRolesByUsertype(id);
      if (res && +res.EC === 0) {
         let roleByUt = res.DT.rolesByUserType;
         setListRolesByUT(
            allRoles.map((item) => {
               return { ...item, isChecked: roleByUt.some((item2) => item2.id === item.id) };
            }),
         );
      }
   };

   const handleChangeUsertype = (e) => {
      setSelectedUtId(e.target.value);
      getApiRolesByUserType(e.target.value);
   };

   const checkRole = (roleId) => {
      return listRolesByUT.some((item) => roleId === item.id && item.isChecked);
   };

   const handleSelectRole = (value) => {
      // toggle isChecked role and set listRoleByUt
      setListRolesByUT((draft) => {
         return draft.map((item) => (+item.id === +value ? { ...item, isChecked: !item.isChecked } : { ...item }));
      });
   };

   const buildDataToSave = () => {
      // result = {usertypeId: 6969, rolesUsertype: [{usertypeId: 4}, {roleId: 55}]}
      let result = {};
      let rolesUtChecked = listRolesByUT.filter((item) => item.isChecked); //filter if role check = true
      let finalRolesUt = rolesUtChecked.map((item) => {
         return { usertypeId: +selectedUtId, roleId: +item.id }; //map to get only {utId and roleId}
      });
      result = { usertypeId: +selectedUtId, rolesUsertype: finalRolesUt }; //data send to backend
      return result;
   };

   const handleSaveAssign = async () => {
      let data = buildDataToSave();
      let res = await assignRolesToUsertype(data);
      if (res && +res.EC === 0) {
         console.log(res.EM);
         setShowModalSuccess({
            isShow: true,
            message: res.EM,
         });
      }
   };

   return (
      <>
         <div className="usertype-role-container">
            <div className="container usertype-role-wrapper">
               <div className="usertype-container">
                  <h4>User type:</h4>
                  <select className="select-form" value={selectedUtId} onChange={(e) => handleChangeUsertype(e)}>
                     {listTypes.length > 0 &&
                        listTypes.map((item, idx) => (
                           <option hidden={item.id === 0} value={item.id} key={`type-${idx}`}>
                              {item.description}
                           </option>
                        ))}
                  </select>
               </div>

               {selectedUtId && selectedUtId > 0 && (
                  <div className="roles-container">
                     <h4>Assign roles:</h4>

                     {allRoles &&
                        allRoles.length > 0 &&
                        allRoles.map((item, index) => {
                           return (
                              <div className="role-wrapper" key={`key-${item.id}`}>
                                 <input
                                    checked={checkRole(item.id)}
                                    className="role-label"
                                    type="checkbox"
                                    id={`role-${item.id}`}
                                    value={item.id}
                                    onChange={(e) => handleSelectRole(e.target.value)}
                                 />
                                 <label htmlFor={`role-${item.id}`}>{item.url}</label>
                              </div>
                           );
                        })}
                  </div>
               )}
            </div>
            {selectedUtId && selectedUtId > 0 && (
               <div className="container save-roles-btn-wrapper">
                  <button className="save-roles-btn btn btn-warning" onClick={handleSaveAssign}>
                     SAVE
                  </button>
               </div>
            )}
         </div>

         <ModalNoti
            show={showModalSuccess.isShow}
            title="Assign roles"
            content={showModalSuccess.message}
            onClose={() =>
               setShowModalSuccess({
                  isShow: false,
                  message: '',
               })
            }
         />
      </>
   );
};

export default UsertypeRoles;
