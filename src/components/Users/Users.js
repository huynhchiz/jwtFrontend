import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Users.scss';

function Users(props) {
   const navigate = useNavigate();

   // check neu chua login => login page
   useEffect(() => {
      let session = JSON.parse(sessionStorage.getItem('loginUser'));

      if (!session || !session.isAuthenticated) {
         navigate('/login');
      }
   }, []);

   return <div>User page</div>;
}

export default Users;
