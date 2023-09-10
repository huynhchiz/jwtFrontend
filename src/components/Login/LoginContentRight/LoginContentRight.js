import './LoginContentRight.scss';

function LoginContentRight() {
   return (
      <div className="login-content-right">
         <form className="form-login">
            <div className="title">
               <h1>facebook</h1>
            </div>

            <div className="input-wrapper">
               <input className="form-input" type="text" placeholder="Email address or phone number" />
            </div>
            <div className="input-wrapper">
               <input className="form-input" type="password" placeholder="Password" />
            </div>

            <div className="login-btn-wrapper">
               <button className="login-btn">Log in</button>
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
               <button className="create-user-btn">Create new account</button>
            </div>
         </form>

         <div className="under-login-form">
            {/*eslint-disable-next-line jsx-a11y/anchor-is-valid*/}
            <a href="#">Create a Page</a>
            <p>for a celebrity, brand or business</p>
         </div>
      </div>
   );
}

export default LoginContentRight;
