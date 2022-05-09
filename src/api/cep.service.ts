import {apiWithToken} from "../util/axios.util";

const api = apiWithToken("/pesquisa-cep");

export const consultarCep = (cep: String) => {
  return api.get(`/${cep}`);
}