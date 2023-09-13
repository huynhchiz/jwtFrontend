import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from 'lodash';

import './App.scss';
import Nav from './components/Nav/Nav';
import AppRoutes from './routes/AppRoutes';

const App = () => {
   const [account, setAccount] = useState({});

   // check if already login
   useEffect(() => {
      let session = JSON.parse(sessionStorage.getItem('loginUser'));
      if (session) {
         setAccount(session);
      }
   }, []);

   return (
      <Router>
         <div className="app">
            <div className="app-header">
               {/* if login - show Nav */}
               {account && !_.isEmpty(account) && account.isAuthenticated && <Nav />}
            </div>

            <div className="app-container">
               <AppRoutes />
            </div>
         </div>
      </Router>
   );
};

export default App;
