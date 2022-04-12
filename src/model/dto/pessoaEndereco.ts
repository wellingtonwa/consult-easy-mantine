import {Pessoa} from "./pessoa";

export interface PessoaEndereco {
  id?: number;
  descricao?: string;
  pessoa?: Pessoa;
  cidade?: string;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
}