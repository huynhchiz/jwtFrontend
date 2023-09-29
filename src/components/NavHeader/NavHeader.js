import { useContext } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { UserContext } from '../../contexts/UserProvider';
import logo from '../../logo.png';
import './NavHeader.scss';

const NavHeader = (props) => {
   // get current location (url)
   const location = useLocation();

   const userContext = useContext(UserContext);
   let currentUsername = userContext.data.account.username;
   // let currentEmail = userContext.data.account.email;

   if (
      location.pathname === '/' ||
      (userContext.data && userContext.data.isAuthenticated === true && location.pathname !== '/login')
   ) {
      return (
         <div className="nav-header-wrapper">
            <Navbar expand="lg" className="bg-body-tertiary">
               <Container>
                  <Navbar.Brand href="/">
                     <img src={logo} width="40" height="40" className="d-inline-block align-top" alt="React logo" />
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                     <Nav className="me-auto">
                        <NavLink className="nav-link" to="/" exact="true">
                           Home
                        </NavLink>
                        <NavLink className="nav-link" to="/users">
                           Users
                        </NavLink>
                        <NavLink className="nav-link" to="/projects">
                           Projects
                        </NavLink>
                     </Nav>
                     <Nav>
                        <Nav.Item className="nav-link">Welcome</Nav.Item>
                        <NavDropdown title={currentUsername} id="basic-nav-dropdown" className="nav-header-dropdown">
                           <NavDropdown.Item href="#action/3.1">Change password</NavDropdown.Item>
                           <NavDropdown.Divider />
                           <NavDropdown.Item href="#action/3.4">Log out</NavDropdown.Item>
                        </NavDropdown>
                     </Nav>
                  </Navbar.Collapse>
               </Container>
            </Navbar>
         </div>
      );
   } else {
      return <></>;
   }
};

export default NavHeader;
