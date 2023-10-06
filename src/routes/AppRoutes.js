import { Route, Routes } from 'react-router-dom';

import Private from './PrivateRoutes'; //PrivateRoutes as Private
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Users from '../components/Users/Users';
import Projects from '../components/Projects/Projects';
import Roles from '../components/Roles/Roles';
import UsertypeRoles from '../components/UsertypeRoles/UsertypeRoles';

function AppRoutes() {
   return (
      <>
         <Routes>
            {/* public routes */}
            <Route path="/" element={'Home'} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* private routes */}
            <Route element={<Private />}>
               <Route path="/users" exact element={<Users />} />
               <Route path="/projects" exact element={<Projects />} />
               <Route path="/roles" exact element={<Roles />} />
               <Route path="/usertype-roles" exact element={<UsertypeRoles />} />
            </Route>

            {/*  */}
            <Route path="*" element={'404 not found'} exact="true" />
         </Routes>
      </>
   );
}

export default AppRoutes;
