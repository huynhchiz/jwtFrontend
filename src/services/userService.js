import axios from '../setup/axios';

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

export { registerNewUser, loginUser, fetchAllUser, deleteUser, createUser, updateUser, getUserAccount };
