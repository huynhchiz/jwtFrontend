// import { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';

import { currentUserSelector } from '../redux/selectors';
// import { UserContext } from '../contexts/UserProvider';

const PrivateRoutes = () => {
   // const userContext = useContext(UserContext);
   const currentUser = useSelector(currentUserSelector);

   if (currentUser && currentUser.isAuthenticated === true) {
      return <Outlet />;
   } else {
      return <Navigate to="/login" />;
   }
};

export default PrivateRoutes;
