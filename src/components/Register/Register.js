import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './Register.scss';
import RegisterContentLeft from './RegisterContentLeft/RegisterContentLeft';
import RegisterContentRight from './RegisterContentRight/RegisterContentRight';
import { UserContext } from '../../contexts/UserProvider';

const Register = (props) => {
   const userContext = useContext(UserContext);
   const navigate = useNavigate();

   useEffect(() => {
      if (userContext.data && userContext.data.isAuthenticated) {
         navigate('/');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className="register-page">
         <div className="register-container">
            <RegisterContentLeft />
            <RegisterContentRight />
         </div>
      </div>
   );
};

export default Register;
