import { useNavigate } from 'react-router-dom';

import './LoginContentLeft.scss';

function LoginContentLeft() {
   const navigate = useNavigate();
   const handleHomePage = () => {
      navigate('/');
   };

   return (
      <div className="login-content-left">
         <div className="title">
            <h1 onClick={handleHomePage}>facebook</h1>
         </div>
         <div className="description">
            <h4>Facebook helps you connect and share with the people in your life.</h4>
         </div>
      </div>
   );
}

export default LoginContentLeft;
