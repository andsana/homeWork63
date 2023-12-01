import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://sanajs20-44fe4-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default axiosApi;