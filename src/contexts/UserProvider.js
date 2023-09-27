import { useState, createContext } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
   const [data, setData] = useState({
      isAuthenticated: false,
      token: '',
      account: {
         email: '',
         username: '',
      },
   });

   const setLogin = (userData) => {
      setData(userData);
   };

   const setLogout = () => {
      setData({
         isAuthenticated: false,
         token: '',
         account: {
            email: '',
            username: '',
         },
      });
   };

   return <UserContext.Provider value={{ data, setLogin, setLogout }}>{children}</UserContext.Provider>;
};

export { UserContext };
export default UserProvider;
