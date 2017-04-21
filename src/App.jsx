import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import Body from './Body';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import './App.css';

import 'react-widgets/dist/css/react-widgets.css';

var instance = axios.create({
    baseURL: 'http://localhost:9000/',
    timeout: 1000,
    headers: {'Content-Type': 'text/plain'}
});

class App extends Component {
    componentWillMount(){
        momentLocalizer(Moment);
    }
    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Header/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Body/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Footer/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export default App;
