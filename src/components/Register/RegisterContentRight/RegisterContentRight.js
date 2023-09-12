import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './RegisterContentRight.scss';
import { useEffect, useState, useRef } from 'react';

function RegisterContentRight() {
   const [email, setEmail] = useState('');
   const [phone, setPhone] = useState('');
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');

   const [validEmail, setValidEmail] = useState(true);
   const [validPassword, setValidPassword] = useState(true);
   const [validConfirmPassword, setValidConfirmPassword] = useState(true);

   const emailRef = useRef();
   const phoneRef = useRef();
   const usernameRef = useRef();
   const passwordRef = useRef();
   const confirmPasswordRef = useRef();

   const allRef = [
      emailRef.current,
      phoneRef.current,
      usernameRef.current,
      passwordRef.current,
      confirmPasswordRef.current,
   ];

   // hook de dieu huong trang cua 'react-router-dom'
   const navigate = useNavigate();
   const handleLoginPage = () => {
      navigate('/login');
   };

   // call API
   useEffect(() => {
      // axios.get('http://localhost:1997/api/ver1/test-api').then((data) => {
      //    console.log(data);
      // });
   }, []);

   // hien thi warning
   const warnInput = (input) => {
      input.closest('.input-wrapper').className = 'input-wrapper form-warning';
   };

   // off warning
   const unwarnInput = (input) => {
      input.closest('.input-wrapper').className = 'input-wrapper';
   };

   // onChange inputs
   const handleChangeInputValue = (event, setState, inputRef) => {
      setState(event.target.value);
      unwarnInput(inputRef);
   };

   // check required value khi blur khoi input hoac nhan submit
   const handleCheckValue = (inputRef, checkValid) => {
      if (!inputRef.value) {
         warnInput(inputRef);
      } else {
         unwarnInput(inputRef);
      }

      // thêm 1 hàm check valid đối với email, password, confirmpassword
      if (checkValid) {
         checkValid();
      }
   };

   // clear input values
   const clearInputValues = () => {
      setEmail('');
      setPhone('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
   };

   // check valid Email
   const checkValidEmail = () => {
      if (email !== '') {
         const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if (!regex.test(email)) {
            setValidEmail(false);
            warnInput(emailRef.current);
         } else {
            setValidEmail(true);
            unwarnInput(emailRef.current);
         }
      }
   };

   // check valid password
   const checkValidPassword = () => {
      if (password !== '') {
         if (password.length < 6) {
            setValidPassword(false);
            warnInput(passwordRef.current);
         } else {
            setValidPassword(true);
            unwarnInput(passwordRef.current);
         }
      }
   };

   // check corret confirm password
   const checkConfirmPassword = () => {
      if (validPassword && confirmPassword !== '') {
         if (confirmPassword !== password) {
            setValidConfirmPassword(false);
            warnInput(confirmPasswordRef.current);
         } else {
            setValidConfirmPassword(true);
            unwarnInput(confirmPasswordRef.current);
         }
      }
   };

   // xu ly submit
   const handleRegister = (e) => {
      e.preventDefault();

      // khúc này vừa mounted thì allRef items nó ra undefined, nên phải check khi submit (tạm)
      const checkInputUndefined = allRef.every((ref) => ref === undefined);

      if (!checkInputUndefined) {
         // check required từng input để warning
         allRef.forEach((ref) => {
            handleCheckValue(ref);
         });

         // check valid Email, PW, confimPW
         checkValidEmail();
         checkValidPassword();
         checkConfirmPassword();

         // check required all
         let isFillAll = allRef.every((ref) => {
            return ref.value !== '' && ref.value !== 'undefined';
         });

         if (isFillAll && validEmail && validPassword && validConfirmPassword) {
            axios.post('http://localhost:1997/api/ver1/register', {
               email,
               phone,
               username,
               password,
            });
            clearInputValues();
         }
      } else {
         document.querySelectorAll('.form-input').forEach((item) => warnInput(item));
      }
   };
   return (
      <div className="register-content-right">
         <div className="form-register">
            <div className="title">
               <h1>facebook</h1>
            </div>

            <div className="input-wrapper">
               {!validEmail && <div className="pop-invalid">Invalid email!</div>}
               <input
                  className="form-input"
                  type="text"
                  placeholder="Email address"
                  ref={emailRef}
                  value={email}
                  onChange={(e) => handleChangeInputValue(e, setEmail, emailRef.current)}
                  onBlur={() => handleCheckValue(emailRef.current, checkValidEmail)}
               />
            </div>

            <div className="input-wrapper">
               <input
                  className="form-input"
                  type="text"
                  placeholder="Phone number"
                  ref={phoneRef}
                  value={phone}
                  onChange={(e) => handleChangeInputValue(e, setPhone, phoneRef.current)}
                  onBlur={() => handleCheckValue(phoneRef.current)}
               />
            </div>

            <div className="input-wrapper">
               <input
                  className="form-input"
                  type="text"
                  placeholder="Your name"
                  ref={usernameRef}
                  value={username}
                  onChange={(e) => handleChangeInputValue(e, setUsername, usernameRef.current)}
                  onBlur={() => handleCheckValue(usernameRef.current)}
               />
            </div>

            <div className="input-wrapper">
               {!validPassword && <div className="pop-invalid">Password must be longer then 6!</div>}
               <input
                  className="form-input"
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                  value={password}
                  onChange={(e) => handleChangeInputValue(e, setPassword, passwordRef.current)}
                  onBlur={() => handleCheckValue(passwordRef.current, checkValidPassword)}
               />
            </div>

            <div className="input-wrapper">
               {!validConfirmPassword && <div className="pop-invalid">Incorrect password!</div>}
               <input
                  className="form-input"
                  type="password"
                  placeholder="Confirm your password"
                  ref={confirmPasswordRef}
                  value={confirmPassword}
                  onChange={(e) => handleChangeInputValue(e, setConfirmPassword, confirmPasswordRef.current)}
                  onBlur={() => handleCheckValue(confirmPasswordRef.current, checkConfirmPassword)}
               />
            </div>

            <div className="register-btn-wrapper">
               <button type="submit" className="register-btn" onClick={handleRegister}>
                  Register
               </button>
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
