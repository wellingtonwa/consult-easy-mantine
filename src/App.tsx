import React from 'react';
import {MantineProvider} from '@mantine/core'
import {NotificationsProvider} from '@mantine/notifications';
import {ModalsProvider} from "@mantine/modals";
import {Provider} from "react-redux";
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Admin from "./layouts/Admin";
import Auth from "./layouts/Auth";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import routes from "./routes";
import Login from "./pages/Login";
import store from "./store";

const App = (props: any) => {

    const getAuthRoutes = (routes: any, layout: string) => {
        return routes.map((prop: any, key: any) => {
            if (prop.layout === layout) {
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

    const componentsSize = 'md';

    return (
        <Provider store={store}>
            <MantineProvider
                theme={{
                    fontFamily: 'Open Sans, sans serif',
                    spacing: {xs: 15, sm: 20, md: 25, lg: 30, xl: 40}
                }}
                defaultProps={{
                    Button: {size: componentsSize},
                    TextInput: { size: componentsSize },
                    Select: { size: componentsSize },
                    DatePicker: { size: componentsSize }
                }}
            >
                <BrowserRouter>
                    <ModalsProvider>
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
                    </ModalsProvider>
                </BrowserRouter>
            </MantineProvider>
        </Provider>
    );
};

export default App;
