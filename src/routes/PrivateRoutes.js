import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useContext } from 'react';
import { UserContext } from '../contexts/UserProvider';

const PrivateRoutes = () => {
   const userContext = useContext(UserContext);

   const navigate = useNavigate();

   // cac route trong PrivateRoutes khi truy cap vao se dc check boi ham nay (check session login)
   useEffect(() => {
      console.log(userContext.data);
      let session = JSON.parse(sessionStorage.getItem('loginUser'));
      if (!session || !session.isAuthenticated) {
         navigate('/login');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return <Outlet />;
};

export default PrivateRoutes;
