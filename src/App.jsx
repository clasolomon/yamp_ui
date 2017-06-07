import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { Route } from 'react-router-dom';

import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';

import ErrorView from './ErrorView';
import Footer from './Footer';
import Header from './header';
import Login from './Login';
import MeetingSetup from './MeetingSetup';
import Register from './Register';
import Start from './Start';
import MeetingSetupEnd from './MeetingSetupEnd';
import Meeting from './Meeting';

import './App.css';
import 'react-widgets/dist/css/react-widgets.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            loggedUser: undefined,
            errorOccured: false
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.handleError = this.handleError.bind(this);
    }

    handleLogout(){
        this.setState({
            loggedUser: undefined
        });
    }

    handleError(){
        this.setState({
            errorOccured: true
        });
    }

    componentWillMount(){
        momentLocalizer(Moment);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.match.isExact && nextProps.location.state){
            if(nextProps.location.state.email){
                this.setState({
                    loggedUser: {
                        name: nextProps.location.state.username,
                        email: nextProps.location.state.email
                    }
                }); 
            }
            if(Object.prototype.hasOwnProperty.call(nextProps.location.state, 'errorOccured')){
                this.setState({
                    errorOccured: false
                }); 
            }
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
                        <Route path="/login" render={(props)=>(<Login {...props} handleError={this.handleError}/>)}/>
                        <Route path="/register" render={(props)=>(<Register {...props} handleError={this.handleError}/>)}/>
                        <Route path="/meetingSetup" render={(props)=>(<MeetingSetup {...props} handleError={this.handleError}/>)}/>
                        <Route path="/endMeetingSetup" component={MeetingSetupEnd}/>
                        <Route path="/meeting-invitation/:invitation_id" render={(props)=>(<Meeting {...props} handleError={this.handleError}/>)}/>
                        {this.state.errorOccured && <ErrorView className="errorView" history={this.props.history}/>}
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
