import {apiWithToken} from "../util/axios.util";

const api = apiWithToken("/pessoa");

export const findAllPessoas = () => {
  return api.get('');
}