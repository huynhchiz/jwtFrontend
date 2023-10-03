import axios from '../setup/axios';

const createNewRoles = (newRoles) => {
   return axios.post('/api/ver1/role/create', newRoles);
};

const readRoles = (page, limit) => {
   return axios.get(`/api/ver1/role/read?page=${page}&limit=${limit}`);
};

const deleteRole = (id) => {
   return axios.delete(`/api/ver1/role/delete`, { data: { id: id } });
};

const updateRole = (description, currentId) => {
   return axios.put(`/api/ver1/role/update`, {
      description,
      currentId,
   });
};

export { createNewRoles, readRoles, deleteRole, updateRole };
