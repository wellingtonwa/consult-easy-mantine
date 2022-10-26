import axios from "axios"
import {jhiAuthenticationToken} from "./auth.util";

const baseURL = "http://localhost:8080/";

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

export default api;
export {apiWithToken};

