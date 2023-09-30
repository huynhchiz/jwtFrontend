import axios from '../setup/axios';

const createNewRoles = (newRoles) => {
   return axios.post('/api/ver1/role/create', newRoles);
};

export { createNewRoles };
