import axios from 'axios';

const registerNewUser = (email, phone, username, password) => {
   return axios.post('http://localhost:1997/api/ver1/register', {
      email,
      phone,
      username,
      password,
   });
};

const loginUser = (loginValue, password) => {
   return axios.post('http://localhost:1997/api/ver1/login', {
      loginValue,
      password,
   });
};

export { registerNewUser, loginUser };
