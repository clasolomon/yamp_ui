import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';

import ErrorView from './ErrorView';
import Footer from './footer';
import Header from './header';
import Member from './member';
import Meeting from './meeting';
import Login from './login';
import MeetingSetup from './meetingSetup';
import Register from './register';
import Start from './start';
import MeetingSetupEnd from './meetingSetupEnd';
import axios from './axios-instance';

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
        axios.get('/logout')
            .then((response)=>{
                this.setState({
                    loggedUser: undefined
                });
                this.props.history.replace({pathname: '/'});
            })
            .catch((err)=>{
                console.log(err);
                this.handleError();
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
                        id: nextProps.location.state.userId,
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
                        <Route path="/" render={(props)=>(<Header history={this.props.history} loggedUser={this.state.loggedUser} handleLogout={this.handleLogout}/>)}/> 
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <Route exact path="/" render={(props)=>(<Start history={this.props.history} loggedUser={this.state.loggedUser}/>)}/>
                        <Route path="/login" render={(props)=>(<Login {...props} handleError={this.handleError}/>)}/>
                        <Route path="/member" render={(props)=>(<Member {...props} loggedUser={this.state.loggedUser} handleError={this.handleError}/>)}/>
                        <Route path="/register" render={(props)=>(<Register {...props} handleError={this.handleError}/>)}/>
                        <Route path="/meetingSetup" render={(props)=>(<MeetingSetup {...props} loggedUser={this.state.loggedUser} handleError={this.handleError}/>)}/>
                        <Route path="/endMeetingSetup" render={(props)=>(<MeetingSetupEnd {...props} loggedUser={this.state.loggedUser}/>)}/>
                        <Route path="/meeting-invitation/:invitation_id" render={(props)=>(<Meeting {...props} handleError={this.handleError} nonMember={false}/>)}/>
                        <Route path="/non-member-invitation/:invitation_id" render={(props)=>(<Meeting {...props} handleError={this.handleError} nonMember={true}/>)}/>
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

App.propTypes = {
    history: PropTypes.object.isRequired,
}

export default App;
