import axios from 'axios';

const fetchAllGender = () => {
   return axios.get('http://localhost:1997/api/ver1/gender/read');
};

export { fetchAllGender };
