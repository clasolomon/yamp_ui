import React, { Component } from 'react';
import { Button, Panel, FormGroup} from 'react-bootstrap';
import PropTypes from 'prop-types';
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

    renderStartPanel(){
        if(this.props.loggedUser){
            return (
                <MemberStartPanel 
                    loggedUser={this.props.loggedUser}  
                    handleManageMeetingsClick={this.handleManageMeetingsClick} 
                    handlePlanMeetingClick={this.handlePlanMeetingClick}
                />
            ); 
        } else {
            return (
                <NonMemberStartPanel 
                    handlePlanMeetingClick={this.handlePlanMeetingClick}
                />
            );
        }
    }

    render() {
        return (
            <span>
                { this.renderStartPanel() }
            </span>
        );
    }
}

Start.propTypes = {
    history: PropTypes.object.isRequired,
    loggedUser: PropTypes.object,
}

function MemberStartPanel({loggedUser, handleManageMeetingsClick, handlePlanMeetingClick}){
    return (
        <Panel className="startPanel">
            <h1>Hello {loggedUser.name}!</h1>
            <FormGroup>
                <Button bsStyle="primary" onClick={handleManageMeetingsClick}>Manage your meetings</Button>
                {' '}
                <Button bsStyle="primary" onClick={handlePlanMeetingClick}>Plan meeting</Button>
            </FormGroup>
        </Panel>
    );
}

function NonMemberStartPanel({handlePlanMeetingClick}){
    return (
        <Panel className="startPanel">
            <h1>Hello!</h1>
            <p>You can plan a meeting as an annonymous user or you can register and you will have access to the history of your meetings.</p>
            <p><Button bsStyle="primary" onClick={handlePlanMeetingClick}>Plan meeting</Button></p>
        </Panel>
    );
}

export default Start;
