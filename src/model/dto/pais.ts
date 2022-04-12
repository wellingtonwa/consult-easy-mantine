import {Estado} from "./estado";

export interface Pais {
  id?: number;
  nome?: string;
  sigla?: string;
  estados?: Estado[];
}