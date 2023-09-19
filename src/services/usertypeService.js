import axios from 'axios';

const fetchAllUsertype = () => {
   return axios.get('http://localhost:1997/api/ver1/usertype/read');
};

export { fetchAllUsertype };
