import React from 'react';
import {MantineProvider} from '@mantine/core'
import {NotificationsProvider} from '@mantine/notifications';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";

import routes from "./routes";

const App = (props: any) => {

  const getAuthRoutes = (routes: any, layout: string) => {
    return routes.map((prop: any, key: any) => {
      if (prop.layout === layout) {
        return (
            <Route
                path={prop.path}
                element={prop.component()}
                key={key}
                {...props}
            />
        );
      } else {
        return null;
      }
    });
  }

  return (
      <BrowserRouter>
        <MantineProvider
            theme={{
              fontFamily: 'Open Sans, sans serif',
              spacing: {xs: 15, sm: 20, md: 25, lg: 30, xl: 40}
            }}>
          <NotificationsProvider position="top-right">
            <Routes>
              <Route path="/admin" element={<Admin/>}>
                {getAuthRoutes(routes, "/admin")}
              </Route>
              <Route path="/auth" element={<Auth/>}>
                {getAuthRoutes(routes, "/auth")}
              </Route>
              <Route
                  path="/"
                  element={<Navigate to="/auth/login" replace/>}
              />
            </Routes>
          </NotificationsProvider>
        </MantineProvider>
      </BrowserRouter>
  );
}

export default App;
