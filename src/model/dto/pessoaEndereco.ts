import {Pessoa} from "./pessoa";
import {Cidade} from "./cidade";

export interface PessoaEndereco {
  id?: number;
  descricao?: string;
  pessoa?: Pessoa;
  cidade?: Cidade;
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cep?: string;
}