import {PessoaEndereco} from "./pessoaEndereco";
import {PessoaContato} from "./pessoaContato";
import BasicDTO from "./basicDTO";

export interface Pessoa extends BasicDTO{
  nome?: number;
  enderecos?: PessoaEndereco[];
  contatos?: PessoaContato[];
  dataNascimento?: string;
  createdDateTime?: string;
  escola?: string;
}