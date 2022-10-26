import {apiWithToken} from "../util/axios.util";
import {Pessoa} from "../model/dto/pessoa";

const api = apiWithToken;

export const findAllPessoas = () => {
  return api.get("/pessoa");
};


export const findByNome = (nome:string) => {
  return api.get(`/pessoa?nome=${nome}`)
}

export const savePessoa = (pessoa: Pessoa) => {
  return api.post("/pessoa", pessoa);
};

export const updatePessoa = (pessoa: Pessoa) => {
  return api.put("/pessoa", pessoa);
};