import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import './Nav.scss';

const Nav = (props) => {
   // get current location (url)
   const location = useLocation();

   const [isShow, setIsShow] = useState(false);

   useEffect(() => {
      let session = JSON.parse(sessionStorage.getItem('loginUser'));

      if (session && location.pathname !== '/login') {
         setIsShow(true);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <>
         {isShow && (
            <div className="topnav">
               <div className="menu-div">
                  {/* dùng NavLink để tự thêm class 'active' khi chọn vào 1 NavLink */}
                  <NavLink to="/" exact="true">
                     Home
                  </NavLink>
                  <NavLink to="/users">User</NavLink>
                  <NavLink to="/projects">Projects</NavLink>
               </div>
               <div className="login-div">{/* <NavLink to="/login">Login</NavLink> */}</div>
            </div>
         )}
      </>
   );
};

export default Nav;
