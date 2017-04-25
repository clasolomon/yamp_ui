import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import Header from './Header';
import Footer from './Footer';
import { Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register';
import MeetingSetup from './MeetingSetup';
import Start from './Start';

import 'react-widgets/dist/css/react-widgets.css';

class App extends Component {
    componentWillMount(){
        momentLocalizer(Moment);
    }
    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Header appHistory={this.props.history}/>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Route exact path="/" component={Start}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/meetingSetup" component={MeetingSetup}/>
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
