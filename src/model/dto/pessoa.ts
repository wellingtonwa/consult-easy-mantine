import {PessoaEndereco} from "./pessoaEndereco";
import {PessoaContato} from "./pessoaContato";


export interface Pessoa {
  nome?: number;
  enderecos?: PessoaEndereco[];
  contatos?: PessoaContato[];
  dataNascimento?: string;
  createdDateTime?: string;
  escola?: string;
}