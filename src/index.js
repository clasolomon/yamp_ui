import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import createHistory from 'history/createBrowserHistory';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';

const appHistory = createHistory();

ReactDOM.render(
    <BrowserRouter history={appHistory}>
        <Route path="/" component={App}/>
    </BrowserRouter>,
    document.getElementById('root')
);
