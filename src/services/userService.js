import axios from '../setup/axios';
import store from '../redux/store';

const state = store.getState();

// register | login Users
const registerNewUser = (email, phone, username, password) => {
   return axios.post('/api/ver1/register', {
      email,
      phone,
      username,
      password,
   });
};

const loginUser = (loginValue, password) => {
   return axios.post('/api/ver1/login', {
      loginValue,
      password,
   });
};

const refreshToken = () => {
   let email = state.currentUser.currentUser.account.email;
   let phone = null;
   // let refreshToken = state.currentUser.currentUser.refreshToken;
   return axios.post('/api/ver1/refresh-token', email, phone);
};

const logoutUser = () => {
   return axios.post('/api/ver1/logout');
};

// CRUD Users
const fetchAllUser = (page, limit) => {
   return axios.get(`/api/ver1/user/read?page=${page}&limit=${limit}`);
};

const deleteUser = (userId) => {
   return axios.delete(`/api/ver1/user/delete`, { data: { id: userId } });
};

const createUser = (email, phone, username, password, address, genderId, usertypeId) => {
   return axios.post('/api/ver1/user/create', {
      email,
      phone,
      username,
      password,
      address,
      genderId,
      usertypeId,
   });
};

const updateUser = (newEmail, newPhone, newUsername, newAddress, currentId, newGenderId, newUsertypeId) => {
   return axios.put('/api/ver1/user/update', {
      newEmail,
      newPhone,
      newUsername,
      newAddress,
      currentId,
      newGenderId,
      newUsertypeId,
   });
};

const getUserAccount = () => {
   return axios.get(`/api/ver1/account`);
};

export {
   registerNewUser,
   loginUser,
   refreshToken,
   logoutUser,
   fetchAllUser,
   deleteUser,
   createUser,
   updateUser,
   getUserAccount,
};
