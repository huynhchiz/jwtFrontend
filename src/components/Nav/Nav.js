import { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { UserContext } from '../../contexts/UserProvider';
import './Nav.scss';

const Nav = (props) => {
   // get current location (url)
   const location = useLocation();

   const userContext = useContext(UserContext);
   let currentUsername = userContext.data.account.username;
   let currentEmail = userContext.data.account.email;

   if (
      location.pathname === '/' ||
      (userContext.data && userContext.data.isAuthenticated === true && location.pathname !== '/login')
   ) {
      return (
         <>
            <div className="topnav">
               <div className="menu-div">
                  {/* dùng NavLink để tự thêm class 'active' khi chọn vào 1 NavLink */}
                  <NavLink to="/" exact="true">
                     Home
                  </NavLink>
                  <NavLink to="/users">Users</NavLink>
                  <NavLink to="/projects">Projects</NavLink>
               </div>
               <div className="login-div">
                  <p>{currentUsername}</p>

                  <p>{currentEmail}</p>
               </div>
            </div>
         </>
      );
   } else {
      return <></>;
   }
};

export default Nav;
