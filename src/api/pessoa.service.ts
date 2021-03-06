import {apiWithToken} from "../util/axios.util";
import {Pessoa} from "../model/dto/pessoa";

const api = apiWithToken("/pessoa");

export const findAllPessoas = () => {
  return api.get('');
};

export const savePessoa = (pessoa: Pessoa) => {
  return api.post('', pessoa);
};

export const updatePessoa = (pessoa: Pessoa) => {
  return api.put('', pessoa);
};