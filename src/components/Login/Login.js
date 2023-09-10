import './Login.scss';
import LoginContentLeft from './LoginContentLeft/LoginContentLeft';
import LoginContentRight from './LoginContentRight/LoginContentRight';

const Login = (props) => {
   return (
      <div className="login-page">
         <div className="login-container">
            <LoginContentLeft />
            <LoginContentRight />
         </div>
      </div>
   );
};

export default Login;
