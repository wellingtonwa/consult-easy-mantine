import React from 'react';
import {MantineProvider} from '@mantine/core'
import {NotificationsProvider} from '@mantine/notifications';
import {ModalsProvider} from "@mantine/modals";
import {Provider} from "react-redux";
import './App.css';
import {BrowserRouter} from "react-router-dom";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import store from "./store";
import RoutesAdmin from "./RoutesAdmin";
import RoutesAuth from "./RoutesAuth";

const App = (props: any) => {

    const componentsSize = 'md';

    return (
        <Provider store={store}>
            <MantineProvider
                theme={{
                    fontFamily: 'Open Sans, sans serif',
                    spacing: {xs: 15, sm: 20, md: 25, lg: 30, xl: 40},
                    components: {
                      Button: {defaultProps: {size: componentsSize}},
                      TextInput: {defaultProps: { size: componentsSize }},
                      Select: {defaultProps: { size: componentsSize }},
                      DatePicker: {defaultProps: { size: componentsSize }}
                    }
                }}
            >
                <BrowserRouter>
                    <ModalsProvider>
                        <NotificationsProvider position="top-right">
                          <RoutesAdmin/>
                          <RoutesAuth/>
                        </NotificationsProvider>
                    </ModalsProvider>
                </BrowserRouter>
            </MantineProvider>
        </Provider>
    );
};

export default App;
