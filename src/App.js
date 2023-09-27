import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';
import Nav from './components/Nav/Nav';
import AppRoutes from './routes/AppRoutes';

const App = () => {
   return (
      <Router>
         <div className="app">
            <div className="app-header">
               <Nav />
            </div>

            <div className="app-container">
               <AppRoutes />
            </div>
         </div>
      </Router>
   );
};

export default App;
