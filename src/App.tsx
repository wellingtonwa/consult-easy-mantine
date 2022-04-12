import React from 'react';
import {MantineProvider} from '@mantine/core'
import {NotificationsProvider} from '@mantine/notifications';
import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";

import routes from "./routes";
import Login from "./pages/Login";

const App = (props: any) => {

    const getAuthRoutes = (routes: any, layout: string) => {
        return routes.map((prop: any, key: any) => {
            if (prop.layout === layout) {
                console.log(prop.path, prop.component);
                return (
                    <Route
                        path={prop.path}
                        component={prop.component}
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
                    <Switch>
                        <Route path="/" exact={true} component={Login}/>
                        <Route path="/admin/*">
                            <Admin>
                                <Switch>
                                    {getAuthRoutes(routes, "/admin")}
                                </Switch>
                            </Admin>
                        </Route>
                        <Route path="/auth">
                            <Auth>
                                {getAuthRoutes(routes, "/auth")}
                            </Auth>
                        </Route>
                    </Switch>
                </NotificationsProvider>
            </MantineProvider>
        </BrowserRouter>
    );
}

export default App;
