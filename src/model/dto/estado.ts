import {Pais} from "./pais";

export interface Estado {
  id?: number;
  nome?: string;
  sigla?: string;
  pais?: Pais;
}