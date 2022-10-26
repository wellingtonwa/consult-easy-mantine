import React, {FC} from "react";
import {Route, Routes as RouteRoutes} from 'react-router-dom';
import Home from "./pages/Home";
import PessoaEditView from './pages/pessoa/PessoaEditView'
import PessoaSearchView from "./pages/pessoa/PessoaSearchView";
import Admin from "./layouts/Admin";
import AnamneseEditView from "./pages/anamnese/AnamneseEditView";

const RoutesAdmin: FC = () => {
  return (
      <RouteRoutes>
        <Route path="/admin" element={<Admin/>}>
          <Route path="/admin/home" element={<Home/>}/>
          <Route path="/admin/paciente/edit" element={<PessoaEditView/>}/>
          <Route path="/admin/paciente" element={<PessoaSearchView/>}/>
          <Route path="/admin/Anamnese" element={<AnamneseEditView/>}/>
        </Route>
      </RouteRoutes>
  );
};

export default RoutesAdmin;