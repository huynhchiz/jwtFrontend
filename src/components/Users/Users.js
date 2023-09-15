import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactPaginate from 'react-paginate';

import './Users.scss';
import { fetchAllUser as fetchUserService } from '../../services/userService';

function Users(props) {
   const [listUsers, setListUsers] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPage, setTotalPage] = useState(0);

   const [limit, setLimit] = useState(3); // limit là max số user trong 1 page

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

   // hàm của thư viện react-paginate
   const handlePageClick = async (e) => {
      setCurrentPage(+e.selected + 1); //e.selected là page clicked
   };

   return (
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
                              <td>{idx + 1}</td>
                              <td>{item.id}</td>
                              <td>{item.email}</td>
                              <td>{item.username ? item.username : ''}</td>
                              <td>{item.phone ? item.phone : ''}</td>
                              <td>{item.Usertype ? item.Usertype.description : ''}</td>
                              <td>
                                 <button className="btn btn-outline-warning mx-2">Edit</button>
                                 <button className="btn btn-outline-danger">Delete</button>
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
   );
}

export default Users;
