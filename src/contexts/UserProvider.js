import { useState, createContext, useEffect } from 'react';

import { getUserAccount as getUserAccountService } from '../services/userService';

const UserContext = createContext();

const UserProvider = ({ children }) => {
   useEffect(() => {
      fetchUserAccount();
   }, []);

   const fetchUserAccount = async () => {
      let res = await getUserAccountService();

      if (res && +res.EC === 0) {
         let usertypeWithRoles = res.DT.usertypeWithRoles;
         let email = res.DT.email;
         let username = res.DT.username;
         let token = res.DT.access_token;

         let data = {
            isAuthenticated: true,
            token,
            account: {
               usertypeWithRoles,
               email,
               username,
            },
         };
         // set user context
         setData(data);
      }
   };

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
