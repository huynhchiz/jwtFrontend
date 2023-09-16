import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactPaginate from 'react-paginate';

import './Users.scss';
import { fetchAllUser as fetchUserService, deleteUser as deleteUserService } from '../../services/userService';
import PopUpNoti from '../reuses/PopUpNoti/PopUpNoti';
import ModalDelete from '../reuses/ModalDelete/ModalDelete';

function Users(props) {
   const [listUsers, setListUsers] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPage, setTotalPage] = useState(0);

   const [limit, setLimit] = useState(3); // limit là max số user trong 1 page

   const [selectUser, setSelectUser] = useState({});
   const [isShowModalDelete, setIsShowModalDelete] = useState(false);
   const [showPop, setShowPop] = useState(false);

   // fetch data mỗi lần currentPage thay đổi
   useEffect(() => {
      fetchUsers();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currentPage]);

   const fetchUsers = async () => {
      let res = await fetchUserService(currentPage, limit);

      if (res && res.data && +res.data.EC === 0) {
         setListUsers(res.data.DT.usersInOnePage);
         setTotalPage(res.data.DT.totalPage);
      }
   };

   // set lại current page sau khi delete hết user trong 1 page,
   // vì thư viện react-paginate ko tự set current page
   useEffect(() => {
      if (listUsers.length === 0) {
         setCurrentPage(totalPage);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [listUsers, currentPage]);

   // hàm của thư viện react-paginate
   const handlePageClick = async (e) => {
      setCurrentPage(+e.selected + 1); //e.selected là page clicked
   };

   // delete button => set 'selected user' => show modal confirm delete user
   const handleDeleteUser = (user) => {
      setIsShowModalDelete(true);
      setSelectUser(user);
   };

   // delete user by 'selected user' => hide modal confirm => show success noti
   const handleSaveDelete = async (user) => {
      let data = await deleteUserService(user.id);
      if (data) {
         console.log(data);
         await fetchUsers();
         setIsShowModalDelete(false);
         setShowPop(true);
      }
   };

   // hide modal confirm delete
   const handleCloseModalDelete = () => {
      setIsShowModalDelete(false);
   };

   // hide pop up noti after delete or create user success
   const handleClosePopup = () => {
      setShowPop(false);
   };

   return (
      <>
         <div className="user-container">
            <div className="users-header">
               <h4 className="title">TABLE USERS</h4>
               <div className="actions mb-2">
                  <button className="btn btn-secondary refresh-btn ms-2">Refresh</button>
                  <button className="btn btn-secondary add-btn ms-2">Add new user</button>
               </div>
            </div>

            <div className="user-body">
               <table className="table table-bordered table-dark table-hover">
                  <thead>
                     <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Id User</th>
                        <th scope="col">Email</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                     </tr>
                  </thead>
                  <tbody>
                     {listUsers && listUsers.length > 0 ? (
                        <>
                           {listUsers.map((item, idx) => (
                              <tr key={`row-${idx}`}>
                                 <td>{idx + 1 + (currentPage - 1) * limit}</td>
                                 <td>{item.id}</td>
                                 <td>{item.email}</td>
                                 <td>{item.username ? item.username : ''}</td>
                                 <td>{item.phone ? item.phone : ''}</td>
                                 <td>{item.Usertype ? item.Usertype.description : ''}</td>
                                 <td>
                                    <button className="btn btn-outline-warning mx-2">Edit</button>
                                    <button
                                       className="btn btn-outline-danger"
                                       onClick={() => {
                                          handleDeleteUser(item);
                                       }}
                                    >
                                       Delete
                                    </button>
                                 </td>
                              </tr>
                           ))}
                        </>
                     ) : (
                        <></>
                     )}
                  </tbody>
               </table>
            </div>
            <div className="user-footer">
               {totalPage > 0 && (
                  <>
                     <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={1}
                        marginPagesDisplayed={1}
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
                  </>
               )}
            </div>
         </div>
         {showPop && (
            <PopUpNoti
               className="popup"
               width="250"
               height="80"
               content={'Deleted success'}
               onClickClose={handleClosePopup}
            />
         )}
         <ModalDelete
            show={isShowModalDelete}
            onClose={handleCloseModalDelete}
            onSave={() => handleSaveDelete(selectUser)}
            user={selectUser.username}
         />
      </>
   );
}

export default Users;
