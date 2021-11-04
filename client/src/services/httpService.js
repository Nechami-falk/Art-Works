import axios from "axios";
import {toast} from 'react-toastify';

axios.interceptors.response.use(null, error =>{

  const expectedError = error.response && error.response.status >= 500;
  if (expectedError) toast ('שגיאה לא צפויה התרחשה, נסה מאוחר יותר');
  return Promise.reject(error);
});

axios.interceptors.request.use(function (req) {
  const token = localStorage.getItem('tokenAdmin');
  req.headers['x-auth-token'] = token;
  return req;
});


const http = {

    get: axios.get,
    post: axios.post,
    put: axios.put,
    patch: axios.patch,
    delete: axios.delete
  };
  
  export default http;