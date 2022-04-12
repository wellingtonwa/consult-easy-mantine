import {Home, User} from "tabler-icons-react";
import PessoaSearchView from "./pages/pessoa/PessoaSearchView";

const menu = [
  {
    label: "Home",
    path: "/",
    icon: Home
  },
  {
    label: "Pacientes",
    path: "/admin/paciente",
    icon: User
  },
]

export default menu;