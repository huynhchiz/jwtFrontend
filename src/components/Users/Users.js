import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

import './Users.scss';
import { fetchAllUser } from '../../services/userService';

function Users(props) {
   const [listUsers, setListUsers] = useState([]);

   useEffect(() => {
      fetchUsers();
   }, []);

   const fetchUsers = async () => {
      let res = await fetchAllUser();

      if (res && res.data && +res.data.EC === 0) {
         setListUsers(res.data.DT);
      }
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
            <div className="pagination-wrapper">
               <ul>
                  <li>
                     <a href="#">{'<'}</a>
                  </li>
                  <li>
                     <a href="#">1</a>
                  </li>
                  <li>
                     <a href="#">2</a>
                  </li>
                  <li>
                     <a href="#">3</a>
                  </li>
                  <li>
                     <a href="#">4</a>
                  </li>
                  <li>
                     <a href="#">{'>'}</a>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
}

export default Users;
