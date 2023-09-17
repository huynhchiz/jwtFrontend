import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactPaginate from 'react-paginate';

import './Users.scss';
import { fetchAllUser as fetchUserService, deleteUser as deleteUserService } from '../../services/userService';
import ModalDelete from '../reuses/ModalDelete/ModalDelete';
import ModalNoti from '../reuses/ModalNoti/ModalNoti';
import ModalInfoUser from '../reuses/ModalInfoUser/ModalInfoUser';
import { registerNewUser as createNewUserService } from '../../services/userService';
import checkValidEmail from '../../functions/checkValidEmail';
import checkValidPassword from '../../functions/checkValidPassword';

function Users(props) {
   const [listUsers, setListUsers] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPage, setTotalPage] = useState(0);

   // eslint-disable-next-line no-unused-vars
   const [limit, setLimit] = useState(3); // limit là max số user trong 1 page

   const [selectUser, setSelectUser] = useState({});
   const [showModalDelete, setShowModalDelete] = useState(false);
   const [showModalInfor, setShowModalInfor] = useState(false);
   const [typeInforModal, setTypeInforModal] = useState('show');

   const [showPopDeleteSuccess, setShowPopDeleteSuccess] = useState(false);
   const [showPopAddSuccess, setShowPopAddSuccess] = useState(false);
   const [showPopUpdateSuccess, setShowPopUpdateSuccess] = useState(false);

   // value inputs
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [address, setAddress] = useState('');

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
   const handleDeleteUserBtn = (user) => {
      setShowModalDelete(true);
      setSelectUser(user);
   };

   // delete user by 'selected user' => hide modal confirm => show success noti
   const handleSaveDelete = async (user) => {
      let data = await deleteUserService(user.id);
      if (data) {
         console.log(data);
         await fetchUsers();
         setShowModalDelete(false);
         setShowPopDeleteSuccess(true);
      }
   };

   // hide modal confirm delete
   const handleCloseModalDelete = () => {
      setShowModalDelete(false);
   };

   // show infor user btn
   const handleShowInforBtn = (user) => {
      setTypeInforModal('show');
      setShowModalInfor(true);
      setSelectUser(user);

      setEmail(user.email);
      setPhone(user.phone);
      setUsername(user.username);
      setAddress(user.address);
   };

   // add new user btn
   const handleAddUserBtn = () => {
      setTypeInforModal('add');
      setShowModalInfor(true);
      setSelectUser({});

      setEmail('');
      setPhone('');
      setUsername('');
      setAddress('');
      setPassword('');
      setConfirmPassword('');
   };

   const handleSaveAddNewUser = async () => {
      let isAllRequired = email !== '' && phone !== '' && username !== '';
      let validEmail = checkValidEmail(email);
      let validPassword = checkValidPassword(password);

      if (isAllRequired) {
         if (validEmail && validPassword && confirmPassword === password) {
            let res = await createNewUserService(email, phone, username, password);
            let resData = res.data;

            // register success
            if (parseInt(resData.EC) === 0) {
               console.log('success: ', resData.EM);
               setShowModalInfor(false);
               setShowPopAddSuccess(true);
               await fetchUsers();

               // existed data
            } else if (parseInt(resData.EC) === 1) {
               console.log('existed data: ', resData.EM);

               // existed email
               if (resData.TYPE === 'email') {
                  console.log(resData.EM);

                  // existed phone
               } else if (resData.TYPE === 'phone') {
                  console.log(resData.EM);
               }

               // register unsuccess
            } else {
               console.log('fail: ', resData.EM);
            }
         }
      } else {
         console.log('unrequired!');
      }
   };

   // edit user btn
   const handleEditUserBtn = (user) => {
      setTypeInforModal('edit');
      setShowModalInfor(true);
      setSelectUser(user);

      setEmail(user.email);
      setPhone(user.phone);
      setUsername(user.username);
      setAddress(user.address);
   };

   const handleSaveUpdateUser = () => {
      // update
   };

   // hide modal infor user (add, edit, show)
   const handleCloseModalInfoUser = () => {
      setShowModalInfor(false);
   };

   // hide pop up noti after delete or create user success
   const handleClosePopup = () => {
      setShowPopDeleteSuccess(false);
      setShowPopAddSuccess(false);
      setShowPopUpdateSuccess(false);
   };

   // change input value
   const handleChangeValueUser = (event, setState) => {
      setState(event.target.value);
   };

   return (
      <>
         <div className="user-container">
            <div className="users-header">
               <h4 className="title">TABLE USERS</h4>
               <div className="actions mb-2">
                  <button className="btn btn-secondary refresh-btn ms-2">Refresh</button>
                  <button
                     className="btn btn-secondary add-btn ms-2"
                     onClick={() => {
                        handleAddUserBtn();
                     }}
                  >
                     Add new user
                  </button>
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
                                 <td>{currentPage > 1 ? idx + 1 + (currentPage - 1) * limit : idx + 1}</td>
                                 <td>{item.id}</td>
                                 <td>{item.email}</td>
                                 <td>{item.username ? item.username : ''}</td>
                                 <td>{item.phone ? item.phone : ''}</td>
                                 <td>{item.Usertype ? item.Usertype.description : ''}</td>
                                 <td>
                                    <button
                                       className="btn btn-outline-success"
                                       onClick={() => {
                                          handleShowInforBtn(item);
                                       }}
                                    >
                                       Show
                                    </button>
                                    <button
                                       className="btn btn-outline-warning mx-2"
                                       onClick={() => {
                                          handleEditUserBtn(item);
                                       }}
                                    >
                                       Edit
                                    </button>
                                    <button
                                       className="btn btn-outline-danger"
                                       onClick={() => {
                                          handleDeleteUserBtn(item);
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
         <ModalDelete
            show={showModalDelete}
            onClose={handleCloseModalDelete}
            onSave={() => handleSaveDelete(selectUser)}
            user={selectUser.username}
         />
         <ModalInfoUser
            show={showModalInfor}
            type={typeInforModal}
            onClose={handleCloseModalInfoUser}
            email={email}
            phone={phone}
            username={username}
            password={password}
            confirmpassword={confirmPassword}
            address={address}
            onChangeEmail={(e) => {
               handleChangeValueUser(e, setEmail);
            }}
            onChangePhone={(e) => {
               handleChangeValueUser(e, setPhone);
            }}
            onChangeUsername={(e) => {
               handleChangeValueUser(e, setUsername);
            }}
            onChangePassword={(e) => {
               handleChangeValueUser(e, setPassword);
            }}
            onChangeConfirmPassword={(e) => {
               handleChangeValueUser(e, setConfirmPassword);
            }}
            onChangeAddress={(e) => {
               handleChangeValueUser(e, setAddress);
            }}
            onSaveAdd={handleSaveAddNewUser}
            onSaveUpdate={handleSaveUpdateUser}
         />

         <ModalNoti
            show={showPopDeleteSuccess}
            onClose={handleClosePopup}
            title={'Delete user'}
            content={'Delete success!'}
         />
         <ModalNoti
            show={showPopAddSuccess}
            onClose={handleClosePopup}
            title={'Create user'}
            content={'Create new user success!'}
         />
         <ModalNoti
            show={showPopUpdateSuccess}
            onClose={handleClosePopup}
            title={'Update user'}
            content={'Update success!'}
         />
      </>
   );
}

export default Users;
