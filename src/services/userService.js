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
const fetchAllUser = (page, limit) => {
   return axios.get(`http://localhost:1997/api/ver1/user/read?page=${page}&limit=${limit}`);
};

const deleteUser = (userId) => {
   return axios.delete(`http://localhost:1997/api/ver1/user/delete`, { data: { id: userId } });
};

const createUser = (email, phone, username, password) => {
   return axios.post('http://localhost:1997/api/ver1/user/create', {
      email,
      phone,
      username,
      password,
   });
};

const updateUser = (newEmail, newPhone, newUsername, newAddress, currentId) => {
   return axios.put('http://localhost:1997/api/ver1/user/update', {
      newEmail,
      newPhone,
      newUsername,
      newAddress,
      currentId,
   });
};

export { registerNewUser, loginUser, fetchAllUser, deleteUser, createUser, updateUser };
