import axios from 'axios';
import localStorage from 'localStorage';
const baseURL = 'http://localhost:3001/';
const newAxios = async function(){
    return new Promise(async (resolve, reject) => {
      const token = localStorage.getItem('token');
      const instance = axios.create({
        baseURL,
        headers: {authorization: `Bearer ${token}`}
      });
      resolve(instance);
    })
  }
export default newAxios; 