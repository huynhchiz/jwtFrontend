import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import Nav from './components/Nav/Nav';
import Login from './components/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
   const isShowNav = false;
   return (
      <Router>
         <div className="App">
            {isShowNav ? <Nav /> : <div />}
            <Routes>
               <Route path="/" element={'Home'} />
               <Route path="/news" element={'News'} />
               <Route path="/contact" element={'Contact'} />
               <Route path="/about" element={'About'} />

               <Route path="/login" element={<Login />} />
               <Route path="*" element={'404 not found'} exact="true" />
            </Routes>
         </div>
      </Router>
   );
};

export default App;
