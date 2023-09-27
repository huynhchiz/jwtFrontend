import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { UserContext } from '../contexts/UserProvider';

const PrivateRoutes = () => {
   const userContext = useContext(UserContext);

   if (userContext.data && userContext.data.isAuthenticated === true) {
      return <Outlet />;
   } else {
      return <Navigate to="/login" />;
   }
};

export default PrivateRoutes;
