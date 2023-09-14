import { Route, Routes } from 'react-router-dom';

import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import Users from '../components/Users/Users';
import Projects from '../components/Projects/Projects';
import Private from './PrivateRoutes'; //PrivateRoutes as Private

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
            </Route>

            {/*  */}
            <Route path="*" element={'404 not found'} exact="true" />
         </Routes>
      </>
   );
}

export default AppRoutes;
