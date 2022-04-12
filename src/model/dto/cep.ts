import {Cidade} from "./cidade";

export interface Cep {
  id?: number;
  cep?: string;
  logradouro?: string;
  bairro?: string;
  cidade?: Cidade;
}