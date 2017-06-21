import React, { Component } from 'react';
import { Button, Panel, FormGroup} from 'react-bootstrap';
import './Start.css';

class Start extends Component {
    constructor(props){
        super(props);
        this.handlePlanMeetingClick = this.handlePlanMeetingClick.bind(this);
        this.handleManageMeetingsClick = this.handleManageMeetingsClick.bind(this);
    }

    handleManageMeetingsClick(){
        this.props.history.push("/member"); 
    }

    handlePlanMeetingClick(){
        this.props.history.push("/meetingSetup"); 
    }

    render() {
        return (
            <span>
                { this.props.loggedUser && <MemberStartPanel {...this.props}  handleManageMeetingsClick={this.handleManageMeetingsClick} handlePlanMeetingClick={this.handlePlanMeetingClick}/> }
                { !this.props.loggedUser && <NonMemberStartPanel/> }
            </span>
        );
    }
}

function MemberStartPanel(props){
    return (
        <Panel className="startPanel">
            <h1>Hello {props.loggedUser.name}!</h1>
            <FormGroup>
                <Button bsStyle="primary" onClick={props.handleManageMeetingsClick}>Manage your meetings</Button>
                {' '}
                <Button bsStyle="primary" onClick={props.handlePlanMeetingClick}>Plan meeting</Button>
            </FormGroup>
        </Panel>
    );
}

function NonMemberStartPanel(props){
    return (
        <Panel className="startPanel">
            <h1>Hello!</h1>
            <p>You can plan a meeting as an annonymous user or you can register and you will have access to the history of your meetings.</p>
            <p><Button bsStyle="primary" onClick={props.handlePlanMeetingClick}>Plan meeting</Button></p>
        </Panel>
    );
}

export default Start;
