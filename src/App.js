// import { useContext } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';
import NavHeader from './components/NavHeader/NavHeader';
import AppRoutes from './routes/AppRoutes';
import LoadingPage from './components/reuses/LoadingPage/LoadingPage';
// import { UserContext } from './contexts/UserProvider';
import { fetchCurrentUser } from './currentUserSlice/currentUserSlice';
import { loadingUserSelector } from './redux/selectors';

const App = () => {
   // fetch user account redux
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(fetchCurrentUser());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const loadingUser = useSelector(loadingUserSelector);

   // const userContext = useContext(UserContext);

   return (
      <Router>
         <div className="app">
            {loadingUser && loadingUser === 'loading' ? (
               <LoadingPage />
            ) : (
               <>
                  <div className="app-header">
                     <NavHeader />
                  </div>

                  <div className="app-container">
                     <AppRoutes />
                  </div>
               </>
            )}
         </div>
      </Router>
   );
};

export default App;
