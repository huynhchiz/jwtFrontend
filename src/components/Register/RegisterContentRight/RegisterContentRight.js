import './RegisterContentRight.scss';
import { useNavigate } from 'react-router-dom';

function RegisterContentRight() {
   // hook de dieu huong trang cua react-router-dom
   const navigate = useNavigate();

   const handleLoginPage = () => {
      navigate('/login');
   };

   return (
      <div className="register-content-right">
         <div className="form-register">
            <div className="title">
               <h1>facebook</h1>
            </div>

            <div className="input-wrapper">
               <input className="form-input" type="text" placeholder="Email address" />
            </div>

            <div className="input-wrapper">
               <input className="form-input" type="text" placeholder="Phone number" />
            </div>

            <div className="input-wrapper">
               <input className="form-input" type="text" placeholder="Your name" />
            </div>

            <div className="input-wrapper">
               <input className="form-input" type="password" placeholder="Password" />
            </div>

            <div className="input-wrapper">
               <input className="form-input" type="password" placeholder="Confirm your password" />
            </div>

            <div className="register-btn-wrapper">
               <button className="register-btn">Register</button>
            </div>

            <hr className="big-line" />
            <div className="small-line">
               <span className="span-line"></span>
               <span className="or-line">or</span>
               <span className="span-line"></span>
            </div>

            <div className="create-btn-wrapper">
               <button className="create-user-btn" onClick={handleLoginPage}>
                  Already have an account. Login
               </button>
            </div>
         </div>
      </div>
   );
}

export default RegisterContentRight;
