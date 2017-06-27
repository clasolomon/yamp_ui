import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import 'font-awesome/css/font-awesome.min.css';
import App from './App';
import './index.css';

const appHistory = createHistory();

ReactDOM.render(
  <BrowserRouter history={appHistory}>
    <Route path="/" component={App} />
  </BrowserRouter>,
    document.getElementById('root'),
);
