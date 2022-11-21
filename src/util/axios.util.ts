import axios from "axios"
import {jhiAuthenticationToken} from "./auth.util";

const baseURL = "http://localhost:8081/";

const api = axios.create({
  baseURL
});

const apiWithToken = axios.create({
  baseURL
});

apiWithToken.interceptors.request.use(config => {
  let token:string | null = sessionStorage.getItem(jhiAuthenticationToken);
  console.log(token);
  if (token) {
    config.headers = {...config.headers, ...{"Authorization": `Bearer ${token}`}}
  }
  return config;
});

apiWithToken.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response.status === 401) {
    sessionStorage.removeItem(jhiAuthenticationToken);
    Promise.reject(error);
    (window as Window).location = '/';
  }
})

export default api;
export {apiWithToken};

