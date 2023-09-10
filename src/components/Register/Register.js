import './Register.scss';
import RegisterContentLeft from './RegisterContentLeft/RegisterContentLeft';
import RegisterContentRight from './RegisterContentRight/RegisterContentRight';

const Register = (props) => {
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
