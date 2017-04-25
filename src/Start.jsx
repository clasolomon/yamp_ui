import React, { Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

class Start extends Component {
    constructor(props){
        super(props);
        this.handlePlanMeetingClick = this.handlePlanMeetingClick.bind(this);
    }

    handlePlanMeetingClick(){
        this.props.history.push("/meetingSetup"); 
    }

    render() {
        return (
            <Jumbotron>
                <h1>Hello!</h1>
                <p>This is a simple web application created with the sole purpose of learning.</p>
                <p>You can plan a meeting as an annonymous user or you can register and you will have access to the history of your meetings.</p>
                <p><Button bsStyle="primary" onClick={this.handlePlanMeetingClick}>Plan meeting</Button></p>
            </Jumbotron>
        );
    }
}

export default Start;
