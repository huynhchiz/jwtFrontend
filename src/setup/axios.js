import axios from 'axios';
// import { useDispatch } from 'react-redux';
import store from '../redux/store';
import currentUserSlice, { refreshUser, logoutUserApi } from '../currentUserSlice/currentUserSlice';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const instance = axios.create({
   // baseURL: 'http://localhost:1997',
   baseURL: BACKEND_URL,
});

// Alter defaults after instance has been created
// gán thêm 1 header là Authorization có giá trị là 'Bearer 'jwt'' vào request Header
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt')}`;

// Add a request interceptor
instance.interceptors.request.use(
   function (config) {
      // Do something before request is sent
      return config;
   },
   function (error) {
      // Do something with request error
      // return Promise.reject(error);
      return error.request.data;
   },
);

// Add a response interceptor
instance.interceptors.response.use(
   function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response.data;
   },
   function (error) {
      // const dispatch = useDispatch()

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      // get status error from server
      const status = (error && error.response && error.response.status) || 500;

      switch (status) {
         // authentication (token related issues)
         case 401: {
            console.log('Unauthorizaed user...');
            // window.location.href = '/login';
            // return Promise.reject(error);
            return error.response.data;
         }

         // forbidden (permission related issues)
         case 403: {
            console.log(`You don't have permission to access...`);
            console.log('403 err: ', error.response.data);

            // token expired => refresh token user
            if (+error.response.data.EC === -3) {
               store.dispatch(refreshUser());
               return error.response.data;
            }

            // store.dispatch(logoutUser());
            store.dispatch(currentUserSlice.actions.logoutUser());
            store.dispatch(logoutUserApi());
            // return Promise.reject(error);
            return error.response.data;
         }

         // bad request
         case 400: {
            // return Promise.reject(error);
            return error.response.data;
         }

         // not found
         case 404: {
            // return Promise.reject(error);
            return error.response.data;
         }

         // conflict
         case 409: {
            // return Promise.reject(error);
            return error.response.data;
         }

         // unprocessable
         case 422: {
            // return Promise.reject(error);
            return error.response.data;
         }

         // generic api error (server related) unexpected
         default: {
            // console.log('error: ', error);
            // console.log('error res: ', error.response);
            // console.log('error.res.data: ', error.response.data);
            // return Promise.reject(error);
            return error;
         }
      }
   },
);

// allow set jwt on cookie (react axios)
instance.defaults.withCredentials = true;

export default instance;
