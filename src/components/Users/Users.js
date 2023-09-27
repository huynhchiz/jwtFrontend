import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Users.scss';
import {
   fetchAllUser as fetchUserService,
   deleteUser as deleteUserService,
   createUser as createUserService,
   updateUser as updateUserService,
} from '../../services/userService';

import ModalDelete from '../reuses/ModalDelete/ModalDelete';
import ModalNoti from '../reuses/ModalNoti/ModalNoti';
import ModalInfoUser from '../reuses/ModalInfoUser/ModalInfoUser';
import checkValidEmail from '../../functions/checkValidEmail';
import checkValidPassword from '../../functions/checkValidPassword';
import { faInfo, faPenFancy, faPlus, faRotate } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

function Users(props) {
   const [listUsers, setListUsers] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPage, setTotalPage] = useState(0);

   // limit là max số user trong 1 page
   const limit = 5;

   // selectUser set when click edit, show, delete buttons
   const [selectUser, setSelectUser] = useState({});

   const [showModalDelete, setShowModalDelete] = useState(false);
   const [showModalInfor, setShowModalInfor] = useState(false);
   const [typeInforModal, setTypeInforModal] = useState('show');

   const [showPopUnvalid, setShowPopUnvalid] = useState(false);
   const [unvalidMessage, setUnvalidMessage] = useState('');
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
   const [genderId, setGenderId] = useState('');
   const [usertypeId, setUsertypeId] = useState('');

   // fetch data mỗi lần currentPage thay đổi
   useEffect(() => {
      fetchUsers();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currentPage]);

   const fetchUsers = async () => {
      let res = await fetchUserService(currentPage, limit);

      if (res && +res.EC === 0) {
         setListUsers(res.DT.usersInOnePage);
         setTotalPage(res.DT.totalPage);
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

   // delete button => set 'selected user'
   const handleDeleteUserBtn = (user) => {
      setShowModalDelete(true);
      setSelectUser(user);
   };

   // delete user by 'selected user'
   const handleSaveDelete = async (user) => {
      let data = await deleteUserService(user.id);
      if (data) {
         console.log(data);
         await fetchUsers();
         setShowModalDelete(false);
         setShowPopDeleteSuccess(true);
      } else {
         console.log('no');
      }
   };

   // close modal confirm delete
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
      setUsertypeId(user.Usertype !== null && user.Usertype.id !== null ? user.Usertype.id : '');
      setGenderId(user.Gender !== null && user.Gender.id !== null ? user.Gender.id : '');
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
      setGenderId('');
      setUsertypeId('');
   };

   const handleSaveAddNewUser = async () => {
      let isAllFilledIn = email !== '' && phone !== '' && username !== '';
      let validEmail = checkValidEmail(email);
      let validPassword = checkValidPassword(password);

      if (isAllFilledIn) {
         if (validEmail && validPassword && confirmPassword === password) {
            let res = await createUserService(email, phone, username, password, address, genderId, usertypeId);

            // register success
            if (parseInt(res.EC) === 0) {
               console.log('success: ', res.EM);
               setShowModalInfor(false);
               setShowPopAddSuccess(true);
               fetchUsers();

               // existed data
            } else if (parseInt(res.EC) === 1) {
               setUnvalidMessage(res.EM);
               setShowPopUnvalid(true);
               console.log('existed data: ', res.EM);

               // register unsuccess
            } else {
               setUnvalidMessage(res.EM);
               setShowPopUnvalid(true);
               console.log('fail: ', res.EM);
            }

            // unvalid
         } else {
            setUnvalidMessage('unvalid');
            setShowPopUnvalid(true);
            console.log('unvalid');
         }

         // not filled in yet
      } else {
         setUnvalidMessage('not filled in yet!');
         setShowPopUnvalid(true);
         console.log('not filled in yet!');
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
      setUsertypeId(user.Usertype !== null && user.Usertype.id !== null ? user.Usertype.id : '');
      setGenderId(user.Gender !== null && user.Gender.id !== null ? user.Gender.id : '');
   };

   const handleSaveUpdateUser = async () => {
      let isAllRequired = email !== '' && phone !== '' && username !== '' && address !== '';
      let validEmail = checkValidEmail(email);

      if (isAllRequired) {
         if (validEmail) {
            let res = await updateUserService(email, phone, username, address, selectUser.id, genderId, usertypeId);

            // update success
            if (+res.EC === 0) {
               console.log('success: ', res.EM);
               setShowModalInfor(false);
               setShowPopUpdateSuccess(true);
               fetchUsers();

               // existed data
            } else if (+res.EC === 1) {
               setUnvalidMessage(res.EM);
               setShowPopUnvalid(true);
               console.log('existed data: ', res.EM);

               // update unsuccess
            } else {
               setUnvalidMessage(res.EM);
               setShowPopUnvalid(true);
               console.log('fail: ', res.EM);
            }
         }
      } else {
         setUnvalidMessage('unrequired!');
         setShowPopUnvalid(true);
         console.log('unrequired!');
      }
   };

   // close modal infor user (add, edit, show)
   const handleCloseModalInfoUser = () => {
      setShowModalInfor(false);
   };

   // hide pop up noti after delete or create user success
   const handleClosePopup = () => {
      setShowPopUnvalid(false);
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
                  <button className="btn btn-success refresh-btn ms-2" onClick={fetchUsers}>
                     <FontAwesomeIcon className="icon-inside-btn" icon={faRotate} />
                     Refresh
                  </button>
                  <button
                     className="btn btn-primary add-btn ms-2"
                     onClick={() => {
                        handleAddUserBtn();
                     }}
                  >
                     <FontAwesomeIcon className="icon-inside-btn" icon={faPlus} />
                     Add user
                  </button>
               </div>
            </div>

            <div className="user-body ">
               <table className="table table-bordered table-dark table-hover">
                  <thead>
                     <tr>
                        <th scope="col">No.</th>
                        <th scope="col">Id User</th>
                        <th scope="col">Email</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Type</th>
                        <th scope="col">Gender</th>
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
                                 <td>{item.Gender ? item.Gender.name : ''}</td>
                                 <td className="user-actions">
                                    <button
                                       className="user-btn info-btn"
                                       onClick={() => {
                                          handleShowInforBtn(item);
                                       }}
                                    >
                                       <FontAwesomeIcon icon={faInfo} />
                                    </button>
                                    <button
                                       className="user-btn edit-btn"
                                       onClick={() => {
                                          handleEditUserBtn(item);
                                       }}
                                    >
                                       <FontAwesomeIcon icon={faPenFancy} />
                                    </button>
                                    <button
                                       className="user-btn delete-btn"
                                       onClick={() => {
                                          handleDeleteUserBtn(item);
                                       }}
                                    >
                                       <FontAwesomeIcon icon={faTrashCan} />
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
            // Modal attributes
            show={showModalInfor}
            type={typeInforModal}
            onClose={handleCloseModalInfoUser}
            // values
            email={email}
            phone={phone}
            username={username}
            password={password}
            confirmpassword={confirmPassword}
            address={address}
            genderId={genderId}
            usertypeId={usertypeId}
            // onchanges
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
            onChangeGender={(e) => {
               handleChangeValueUser(e, setGenderId);
            }}
            onChangeUserType={(e) => {
               handleChangeValueUser(e, setUsertypeId);
            }}
            // onSaves
            onSaveAdd={handleSaveAddNewUser}
            onSaveUpdate={handleSaveUpdateUser}
         />

         <ModalNoti show={showPopUnvalid} onClose={handleClosePopup} title="Unvalid" content={unvalidMessage} />

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
