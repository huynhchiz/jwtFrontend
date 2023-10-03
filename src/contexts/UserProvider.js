import { useState, createContext, useEffect } from 'react';

import { getUserAccount as getUserAccountService } from '../services/userService';

const UserContext = createContext();

const UserProvider = ({ children }) => {
   const defaultData = {
      isLoading: true,
      isAuthenticated: false,
      token: '',
      account: {
         email: '',
         username: '',
      },
   };

   const [data, setData] = useState(defaultData);

   const fetchUserAccount = async () => {
      let res = await getUserAccountService();

      if (res && +res.EC === 0) {
         let usertypeWithRoles = res.DT.usertypeWithRoles;
         let email = res.DT.email;
         let username = res.DT.username;
         let token = res.DT.access_token;

         let data = {
            isLoading: false,
            isAuthenticated: true,
            token,
            account: {
               usertypeWithRoles,
               email,
               username,
            },
         };
         // set user context
         setTimeout(() => {
            setData(data);
            console.log(data);
         }, 1 * 1000);
      } else {
         setData({ ...defaultData, isLoading: false });
      }
   };

   useEffect(() => {
      let currentPath = window.location.pathname;
      if (currentPath !== '/' && currentPath !== '/login' && currentPath !== '/register') {
         fetchUserAccount();
      } else {
         setData({ ...data, isLoading: false });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const setLogin = (userData) => {
      setData({ ...userData, isLoading: false });
   };

   const setLogout = () => {
      setData({ ...defaultData, isLoading: false });
   };

   return <UserContext.Provider value={{ data, setLogin, setLogout }}>{children}</UserContext.Provider>;
};

export { UserContext };
export default UserProvider;
