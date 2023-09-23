import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import './LoginContentRight.scss';
import { loginUser } from '../../../services/userService';

function LoginContentRight() {
   const [loginValue, setLoginValue] = useState('');
   const [password, setPassword] = useState('');

   const [incorrectLogin, setIncorrectLogin] = useState({
      isIncorrect: false,
      message: '',
   });

   const loginValueRef = useRef();
   const passwordRef = useRef();

   // neu dang co session login thi ko cho vao /login nua
   useEffect(() => {
      let session = JSON.parse(sessionStorage.getItem('loginUser'));

      if (session) {
         navigate('/');
         window.location.reload();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

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
   const handleLogin = async () => {
      // check required input
      if (!loginValue) {
         warnInput(loginValueRef.current);
         return;
      }

      if (!password) {
         warnInput(passwordRef.current);
         return;
      }

      //
      let res = await loginUser(loginValue, password);

      // success login
      if (res && +res.EC === 0) {
         console.log('success: ', res.EM);

         // set user login session
         let data = {
            isAuthenticated: true,
            token: 'fake token',
         };
         // sessionStorage : khi close tab se xoa khoi storage (khac voi localStorage)
         sessionStorage.setItem('loginUser', JSON.stringify(data));

         // chuyen huong page
         navigate('/users');

         // fix tạm lỗi ko tự re-render component App khi chuyển hướng sang /users để hiện Nav
         window.location.reload();
         // học thêm redux để quản lý props phức tạp
      }

      // fail login
      if (res && +res.EC !== 0) {
         setIncorrectLogin({
            isIncorrect: true,
            message: res.EM,
         });

         console.log('fail: ', res.EM);
         return;
      }
   };

   // press enter to login
   const handleEnter = (e) => {
      if (e.code === 'Enter' && e.charCode === 0) {
         handleLogin();
      }
   };

   // RENDER
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
                  onKeyDown={handleEnter}
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
                  onKeyDown={handleEnter}
               />
            </div>

            {incorrectLogin.isIncorrect && <div className="incorrect-login">{incorrectLogin.message}</div>}

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
