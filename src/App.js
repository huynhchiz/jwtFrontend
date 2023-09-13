import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';

import './App.scss';
import Nav from './components/Nav/Nav';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Users from './components/Users/Users';

const App = () => {
   const [account, setAccount] = useState({});

   // check if login by getItem on session storage
   useEffect(() => {
      let session = JSON.parse(sessionStorage.getItem('loginUser'));
      console.log(session);
      if (session) {
         setAccount(session);
      }
   }, []);

   return (
      <Router>
         <div className="App">
            {/* if login - show Nav */}
            {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />}
            <Routes>
               <Route path="/" element={'Home'} />
               <Route path="/news" element={'News'} />
               <Route path="/contact" element={'Contact'} />
               <Route path="/about" element={'About'} />

               <Route path="/login" element={<Login />} />
               <Route path="/register" element={<Register />} />

               <Route path="/users" element={<Users />} />

               <Route path="*" element={'404 not found'} exact="true" />
            </Routes>
         </div>
      </Router>
   );
};

export default App;
