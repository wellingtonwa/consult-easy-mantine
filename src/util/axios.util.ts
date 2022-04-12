import axios from "axios"
import {jhiAuthenticationToken} from "./auth.util";

const baseURL = "http://localhost:8080/";

const api = axios.create({
  baseURL
})


export const apiWithToken = (path: string) => {
  let token = sessionStorage.getItem(jhiAuthenticationToken);
  let headers = { Authorization: `Bearer ${token}` };
  let baseUrl = process.env.REACT_APP_BASE_URL || baseURL;
  return axios.create({
    baseURL: baseUrl + path,
    headers
  });
};

export default api;

