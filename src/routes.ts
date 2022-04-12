import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PessoaSearchView from "./pages/pessoa/PessoaSearchView";
import PessoaEditView from "./pages/pessoa/PessoaEditView";

export interface RouteProps {
  path: string;
  name: string;
  component: React.ReactNode;
  layout: string;
}

const routes: RouteProps[] = [
  {
    path: '/admin/home',
    name: 'Dashboard',
    component: Home,
    layout: '/admin'
  },
  {
    path: '/admin/paciente',
    name: 'Pacientes',
    component: PessoaSearchView,
    layout: '/admin'
  },
  {
    path: '/admin/paciente/edit',
    name: 'Editar Paciente',
    component: PessoaEditView,
    layout: '/admin'
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: Login,
    layout: '/auth'
  },
];

export default routes;
