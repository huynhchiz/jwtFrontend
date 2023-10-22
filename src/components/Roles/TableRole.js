import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useImmer } from 'use-immer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPenFancy, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import ReactPaginate from 'react-paginate';

import './TableRole.scss';
import {
   readRoles as readRolesService,
   deleteRole as deleteRoleService,
   updateRole as updateRoleService,
} from '../../services/roleService';
import ModalDelete from '../reuses/ModalDelete/ModalDelete';
import ModalNoti from '../reuses/ModalNoti/ModalNoti';

import { useDispatch } from 'react-redux';
import currentUserSlice from '../../currentUserSlice/currentUserSlice';

const TableRole = forwardRef((props, ref) => {
   const dispatch = useDispatch();

   useImperativeHandle(ref, () => ({
      fetchRoles,
   }));

   const limit = 3;

   const fetchRoles = async () => {
      let dataPage = { page: currentPage, limit };
      // dispatch(currentUserSlice.actions.setCurrentApi([readRolesService, dataPage]));

      let res = await readRolesService(dataPage);
      if (res && +res.EC === 0) {
         setListRole(res.DT.rolesInOnePage);
         setTotalPage(res.DT.totalPage);
      }
   };

   const [listRole, setListRole] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPage, setTotalPage] = useState(0);

   const [selectRole, setSelectRole] = useImmer({
      currentId: '',
      url: '',
      description: '',
   });

   const [showModalDelete, setShowModalDelete] = useState(false);
   const [showPopDeleteSuccess, setShowPopDeleteSuccess] = useState(false);

   const [showEditDes, setShowEditDes] = useState({
      isShow: false,
      idShow: '',
   });
   const [showPopUpdateSuccess, setShowPopUpdateSuccess] = useState(false);

   // fetch roles with pagination
   useEffect(() => {
      fetchRoles();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currentPage]);

   // set lại current page sau khi delete hết role trong 1 page vì thư viện react-paginate ko tự set current page
   useEffect(() => {
      if (listRole.length === 0) {
         setCurrentPage(totalPage);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [listRole, currentPage]);

   // hàm của thư viện react-paginate
   const handlePageClick = async (e) => {
      setCurrentPage(+e.selected + 1); //e.selected là page clicked
   };

   // delete button => set 'selected role'
   const handleDeleteRoleBtn = (role) => {
      setSelectRole((draft) => {
         draft.currentId = role.id;
      });
      setShowModalDelete(true);
   };

   // delete role by 'selected role'
   const handleSaveDelete = async () => {
      dispatch(currentUserSlice.actions.setCurrentApi([deleteRoleService, selectRole.currentId]));

      let res = await deleteRoleService(selectRole.currentId);
      if (res) {
         console.log(res);
         await fetchRoles();
         setShowModalDelete(false);
         setShowPopDeleteSuccess(true);
      } else {
         console.log('no res');
      }
   };

   // edit and update role description
   const handleSetEdit = (role) => {
      setSelectRole((draft) => {
         draft.currentId = role.id;
         draft.description = role.description;
      });

      setShowEditDes({
         isShow: true,
         idShow: role.id,
      });
   };

   const handleOnChangeDes = (e, role) => {
      setSelectRole((draft) => {
         draft.currentId = role.id;
         draft.description = e.target.value;
      });
   };

   const handleSaveUpdateRole = async () => {
      let dataUpdate = {
         description: selectRole.description,
         currentId: selectRole.currentId,
      };
      dispatch(currentUserSlice.actions.setCurrentApi([updateRoleService, dataUpdate]));

      let res = await updateRoleService(dataUpdate);

      if (res && +res.EC === 0) {
         console.log(res.EM);
         await fetchRoles();
         setShowEditDes({ isShow: false, idShow: '' });
         setShowPopUpdateSuccess(true);
      }
   };

   const handleCloseModalPopUp = () => {
      setShowModalDelete(false);
      setShowPopDeleteSuccess(false);
      setShowPopUpdateSuccess(false);
      // .........
   };

   return (
      <div className="table-role-wrapper">
         <h4 className="title">List roles:</h4>
         <table className="table table-bordered table-light table-hover">
            <thead>
               <tr>
                  <th scope="col">Id Role</th>
                  <th scope="col">URL</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th>
               </tr>
            </thead>
            <tbody>
               <>
                  {listRole &&
                     listRole.length > 0 &&
                     listRole.map((role, index) => (
                        <tr key={'role-0' + role.id}>
                           <td>{role.id}</td>
                           <td>{role.url}</td>
                           <td onDoubleClick={() => handleSetEdit(role)}>
                              {showEditDes.isShow && showEditDes.idShow === role.id ? (
                                 <input value={selectRole.description} onChange={(e) => handleOnChangeDes(e, role)} />
                              ) : (
                                 role.description
                              )}
                           </td>
                           <td className="role-actions">
                              {showEditDes.isShow && showEditDes.idShow === role.id ? (
                                 <button className="role-btn update-btn" onClick={handleSaveUpdateRole}>
                                    <FontAwesomeIcon icon={faCircleCheck} />
                                 </button>
                              ) : (
                                 <button className="role-btn edit-btn" onClick={() => handleSetEdit(role)}>
                                    <FontAwesomeIcon icon={faPenFancy} />
                                 </button>
                              )}
                              <button
                                 className="role-btn delete-btn"
                                 onClick={() => {
                                    handleDeleteRoleBtn(role);
                                 }}
                              >
                                 <FontAwesomeIcon icon={faTrashCan} />
                              </button>
                           </td>
                        </tr>
                     ))}
               </>
            </tbody>
         </table>
         {totalPage > 0 && (
            <div className="list-roles-paginate">
               <ReactPaginate
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={4}
                  marginPagesDisplayed={4}
                  pageCount={totalPage}
                  previousLabel="< previous"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
               />
            </div>
         )}

         <ModalDelete
            title={'DELETE THIS ROLE'}
            show={showModalDelete}
            onClose={handleCloseModalPopUp}
            onSave={handleSaveDelete}
            user={selectRole.url}
         />
         <ModalNoti
            show={showPopDeleteSuccess}
            onClose={handleCloseModalPopUp}
            title={'Delete role'}
            content={'Delete success!'}
         />
         <ModalNoti
            show={showPopUpdateSuccess}
            onClose={handleCloseModalPopUp}
            title={'Update role'}
            content={'Update success!'}
         />
      </div>
   );
});

export default TableRole;
