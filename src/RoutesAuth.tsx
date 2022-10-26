import React, {FC} from "react";
import {Route, Routes as RouteRoutes} from 'react-router-dom';
import Login from "./pages/Login";
import Auth from "./layouts/Auth";

const RoutesAuth: FC = () => {
  return (
      <RouteRoutes>
        <Route path="/" element={<Login/>}/>
      </RouteRoutes>
  );
};

export default RoutesAuth;