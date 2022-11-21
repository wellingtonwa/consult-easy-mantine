import React from 'react';
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

    return (
        <BrowserRouter>
            <ModalsProvider>
                <NotificationsProvider position="top-right">
                    <RoutesAdmin/>
                    <RoutesAuth/>
                </NotificationsProvider>
            </ModalsProvider>
        </BrowserRouter>
    );
};

export default App;
