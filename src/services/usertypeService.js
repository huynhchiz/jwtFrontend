import axios from '../setup/axios';

const fetchAllUsertype = () => {
   return axios.get('/api/ver1/usertype/read');
};

export { fetchAllUsertype };
