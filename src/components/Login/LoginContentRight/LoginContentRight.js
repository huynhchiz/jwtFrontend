import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';

import './LoginContentRight.scss';
import { loginUser } from '../../../services/userService';

function LoginContentRight() {
   const [loginValue, setLoginValue] = useState('');
   const [password, setPassword] = useState('');

   const loginValueRef = useRef();
   const passwordRef = useRef();

   // hook de dieu huong trang cua react-router-dom
   const navigate = useNavigate();
   const handleRegisterPage = () => {
      navigate('/register');
   };

   // hien thi warning
   const warnInput = (input) => {
      input.closest('.input-wrapper').className = 'input-wrapper form-warning';
   };

   // off warning
   const unwarnInput = (input) => {
      input.closest('.input-wrapper').className = 'input-wrapper';
   };

   // on change input
   const handleLoginValue = (e) => {
      setLoginValue(e.target.value);
      unwarnInput(loginValueRef.current);
   };

   const handlePasswordValue = (e) => {
      setPassword(e.target.value);
      unwarnInput(passwordRef.current);
   };

   // on blur input
   const handleCheckRequiredLoginValue = () => {
      if (!loginValue) {
         warnInput(loginValueRef.current);
      }
   };

   const handleCheckRequiredPassword = () => {
      if (!password) {
         warnInput(passwordRef.current);
      }
   };

   // submit login
   const handleLogin = async (e) => {
      e.preventDefault();

      if (!loginValue) {
         warnInput(loginValueRef.current);
         return;
      }

      if (!password) {
         warnInput(passwordRef.current);
         return;
      }

      let data = await loginUser(loginValue, password);
      console.log(data);
   };

   return (
      <div className="login-content-right">
         <div className="form-login">
            <div className="title">
               <h1>facebook</h1>
            </div>

            <div className="input-wrapper">
               <input
                  className="form-input"
                  type="text"
                  placeholder="Email address or phone number"
                  value={loginValue}
                  ref={loginValueRef}
                  onChange={handleLoginValue}
                  onBlur={handleCheckRequiredLoginValue}
               />
            </div>
            <div className="input-wrapper">
               <input
                  className="form-input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  ref={passwordRef}
                  onChange={handlePasswordValue}
                  onBlur={handleCheckRequiredPassword}
               />
            </div>

            <div className="login-btn-wrapper">
               <button className="login-btn" onClick={handleLogin}>
                  Log in
               </button>
            </div>

            {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
            <a href="#" className="forget-password">
               Forgotten password?
            </a>

            <hr className="big-line" />
            <div className="small-line">
               <span className="span-line"></span>
               <span className="or-line">or</span>
               <span className="span-line"></span>
            </div>

            <div className="create-btn-wrapper">
               <button className="create-user-btn" onClick={handleRegisterPage}>
                  Create new account
               </button>
            </div>
         </div>

         <div className="under-login-form">
            {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
            <a href="#">Create a Page</a>
            <p>for a celebrity, brand or business</p>
         </div>
      </div>
   );
}

export default LoginContentRight;
