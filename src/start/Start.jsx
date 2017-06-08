import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import './Start.css';

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
            <Panel className="startPanel">
                <h1>Hello!</h1>
                <p>You can plan a meeting as an annonymous user or you can register and you will have access to the history of your meetings.</p>
                <p><Button bsStyle="primary" onClick={this.handlePlanMeetingClick}>Plan meeting</Button></p>
            </Panel>
        );
    }
}

export default Start;
