import React, { Component } from 'react';
import { Grid, Row, Col, Table, Button, Panel, FormGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import MeetingsList from './MeetingsList';
import axios from '../axios-instance';
import './Member.css';

class Member extends Component {
    constructor(props){
        super(props);
        this.state = {
            meetings: [],
            currentMeeting: null,
            currentMeetingInvitations: null
        }
        this.handlePlanMeetingClick = this.handlePlanMeetingClick.bind(this);
        this.handleDeleteMeetingClick = this.handleDeleteMeetingClick.bind(this);
        this.handleMeetingListItemClick = this.handleMeetingListItemClick.bind(this);
    }

    handlePlanMeetingClick(){
        this.props.history.push("/meetingSetup"); 
    }

    handleDeleteMeetingClick(event){
        let currentMeetingId =  event.target.name;
        axios.delete('/meetings/' + currentMeetingId)
            .then(
                (response)=>{
                    let meetings = this.state.meetings.filter((meeting)=> meeting.meeting_id !== currentMeetingId ? true : false);
                    this.setState(
                        { 
                            meetings: meetings, 
                            currentMeeting: null,
                            currentMeetingInvitations: null
                        }
                    );
                }
            )
            .catch(
                (err)=>{
                    this.props.handleError();
                }
            );
    }

    handleMeetingListItemClick(event){
        let currentMeeting =  this.state.meetings[event.target.name];
        axios.get('/invitations?meetingId=' + currentMeeting.meeting_id)
            .then(
                (response)=>{
                    this.setState(
                        {
                            currentMeetingInvitations: response.data,
                            currentMeeting: currentMeeting
                        }
                    );
                }
            )
            .catch(
                (err)=>{
                    this.props.handleError();
                }
            );
    }

    componentWillMount(){
        axios.get('/meetings?initiatedBy=' + this.props.loggedUser.id)
            .then(
                (response)=>{
                    this.setState({ meetings: response.data });
                }
            )
            .catch(
                (err)=>{
                    this.props.handleError();
                }
            );
    }

    renderMeetingStatus(){
        if(this.state.currentMeeting){
            return (
                <MeetingStatus 
                    currentMeeting={this.state.currentMeeting} 
                    currentMeetingInvitations={this.state.currentMeetingInvitations} 
                    handleDeleteMeetingClick={this.handleDeleteMeetingClick}
                />
            );
        }
        return null;
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={3} sm={3} md={3} lg={3}>
                        <MeetingsList 
                            meetings={this.state.meetings} 
                            handlePlanMeetingClick={this.handlePlanMeetingClick} 
                            handleMeetingListItemClick={this.handleMeetingListItemClick}
                        />
                    </Col>
                    <Col xs={9} sm={9} md={9} lg={9}>
                        { this.renderMeetingStatus() }
                    </Col>
                </Row>
            </Grid>
        );
    }
}

Member.propTypes = {
    history: PropTypes.object.isRequired,
    loggedUser: PropTypes.object,
    handleError: PropTypes.func.isRequired,
}

function MeetingStatus({currentMeeting, currentMeetingInvitations, handleDeleteMeetingClick}){
    return (
        <Panel>
            <p>Meeting name: {currentMeeting.meeting_name}</p>
            <p>Meeting description: {currentMeeting.meeting_description}</p>
            <p>Meeting status:</p>
            <Table responsive>
                <TableHeader 
                    meetingProposedDatesAndTimes={JSON.parse(currentMeeting.proposed_dates_and_times)}
                />
                <tbody>
                    {
                        currentMeetingInvitations.map(
                            (invitation, index) =>
                            <Attendant 
                                key={'a' + index} 
                                index={index} 
                                attendantEmail={invitation.attendant_email} 
                                acceptedDatesAndTimes={JSON.parse(invitation.accepted_dates_and_times)}
                            />
                        )
                    }
                </tbody>
            </Table>
            <FormGroup>
                <Button 
                    bsStyle="primary" 
                    name={currentMeeting.meeting_id} 
                    onClick={handleDeleteMeetingClick}
                >
                    Delete meeting
                </Button>
            </FormGroup>
        </Panel>
    );
}

function TableHeader({meetingProposedDatesAndTimes}){
    return (
        <thead>
            <tr>
                <th></th>
                { 
                    meetingProposedDatesAndTimes.map(
                        (element, index) => 
                        <th key={'th' + index}>
                            {'Start: ' + element.startDate}
                            <br/>
                            {'End: ' + element.endDate}
                        </th>
                        ) 
                        }
                    </tr>
                </thead>
    );
}

function Attendant({index, attendantEmail, acceptedDatesAndTimes}){
    return (
        <tr key={'atr' + index}>
            <td key={'atd' + index}>{attendantEmail}</td>
            {
                acceptedDatesAndTimes.map(
                    (dateAndTime, index) =>
                    <td key={'dttd' + index}>
                        {
                            (
                                ()=>{
                                    if(dateAndTime){
                                        return <i className="fa fa-check-square-o" aria-hidden="true"></i>        
                                    } else {
                                        return <i className="fa fa-square-o" aria-hidden="true"></i>
                                    }
                                }
                            )()
                        }
                    </td>
                ) 
            }
        </tr>
    );
}

export default Member;
