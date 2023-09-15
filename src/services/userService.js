import axios from 'axios';

// register | login Users
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

// CRUD Users
const fetchAllUser = () => {
   return axios.get('http://localhost:1997/api/ver1/user/read');
};

export { registerNewUser, loginUser, fetchAllUser };
