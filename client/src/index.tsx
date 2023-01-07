import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/styles/global/root.scss'
import './assets/styles/global/_resets.scss'
import {store} from "./redux/store"
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);