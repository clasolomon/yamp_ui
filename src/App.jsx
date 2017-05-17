import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import Header from './header';
import Footer from './Footer';
import { Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Register from './Register';
import MeetingSetup from './MeetingSetup';
import Start from './Start';

import 'react-widgets/dist/css/react-widgets.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedUser: undefined
        };

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(){
        this.setState({
            loggedUser: undefined
        });
    }

    componentWillMount(){
        momentLocalizer(Moment);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.match.isExact && nextProps.location.state && nextProps.location.state.email){
            this.setState({
                loggedUser: {
                    name: nextProps.location.state.username,
                    email: nextProps.location.state.email
                }
            }); 
        }
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Route path="/" render={(props)=>(<Header {...props} loggedUser={this.state.loggedUser} handleLogout={this.handleLogout}/>)}/> 
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
