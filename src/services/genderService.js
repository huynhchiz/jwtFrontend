import axios from '../setup/axios';

const fetchAllGender = () => {
   return axios.get('/api/ver1/gender/read');
};

export { fetchAllGender };
