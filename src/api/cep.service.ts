import {apiWithToken} from "../util/axios.util";

const api = apiWithToken;

export const consultarCep = (cep: String) => {
  return api.get(`/pesquisa-cep/${cep}`);
}