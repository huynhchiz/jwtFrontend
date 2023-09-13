import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PrivateRoutes({ protectRoute }) {
   const navigate = useNavigate();

   let session = JSON.parse(sessionStorage.getItem('loginUser'));
   useEffect(() => {
      if (!session || !session.isAuthenticated) {
         navigate('/login');
         return;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return <>{protectRoute}</>;
}

export default PrivateRoutes;
