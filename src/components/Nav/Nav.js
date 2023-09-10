import { NavLink } from 'react-router-dom';

import './Nav.scss';

const Nav = (props) => {
   return (
      <div className="topnav">
         <div className="menu-div">
            {/* dùng NavLink để tự thêm class 'active' khi chọn vào 1 NavLink */}
            <NavLink to="/" exact="true">
               Home
            </NavLink>
            <NavLink to="/news">News</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/about">About</NavLink>
         </div>
         <div className="login-div">
            <NavLink to="/login">Login</NavLink>
         </div>
      </div>
   );
};

export default Nav;
