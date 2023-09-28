import { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThreeCircles } from 'react-loader-spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';
import Nav from './components/Nav/Nav';
import AppRoutes from './routes/AppRoutes';
import { UserContext } from './contexts/UserProvider';

const App = () => {
   const userContext = useContext(UserContext);

   return (
      <Router>
         <div className="app">
            {userContext.data && userContext.data.isLoading && window.location.pathname !== '/login' ? (
               <div className="big-loading-wrapper">
                  <ThreeCircles
                     height="180"
                     width="180"
                     color="#4fa94d"
                     wrapperStyle={{}}
                     wrapperClass=""
                     visible={true}
                     ariaLabel="three-circles-rotating"
                     outerCircleColor="#00CED1"
                     innerCircleColor="#FF1493"
                     middleCircleColor="#ADFF2F"
                  />
                  <div className="loading-description">
                     <p>
                        <span className="loadspan1">L</span>
                        <span className="loadspan2">o</span>
                        <span className="loadspan3">a</span>
                        <span className="loadspan4">d</span>
                        <span className="loadspan5">i</span>
                        <span className="loadspan6">n</span>
                        <span className="loadspan7">g</span>
                     </p>
                  </div>
               </div>
            ) : (
               <>
                  <div className="app-header">
                     <Nav />
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
