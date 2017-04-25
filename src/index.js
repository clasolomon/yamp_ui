import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Register from './Register';
import MeetingSetup from './MeetingSetup';
import createHistory from 'history/createBrowserHistory';
import './index.css';

const appHistory = createHistory();

ReactDOM.render(
    <BrowserRouter history={appHistory}>
        <Route path="/" component={App}/>
    </BrowserRouter>,
    document.getElementById('root')
);
