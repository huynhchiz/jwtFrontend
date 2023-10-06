import axios from '../setup/axios';

const createNewRoles = (newRoles) => {
   return axios.post('/api/ver1/role/create', newRoles);
};

const readRoles = (page, limit) => {
   if (!page && !limit) {
      return axios.get(`/api/ver1/role/read?page=1&limit=999`);
   } else {
      return axios.get(`/api/ver1/role/read?page=${page}&limit=${limit}`);
   }
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

const getRolesByUsertype = (usertypeId) => {
   return axios.get(`/api/ver1/role/by-usertype/${usertypeId}`);
};

const assignRolesToUsertype = (data) => {
   return axios.post('/api/ver1/role/assign-to-usertype', data);
};

export { createNewRoles, readRoles, deleteRole, updateRole, getRolesByUsertype, assignRolesToUsertype };
