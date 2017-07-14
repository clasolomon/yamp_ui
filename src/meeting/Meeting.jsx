import React, { Component } from 'react';
import { Button, FormGroup, Checkbox, Panel, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from '../axios-instance';

class Meeting extends Component {
    constructor(props){
        super(props);
        this.state = {
            meetingId: '',
            invitationId: '',
            attendantEmail: '',
            meetingAdmin: '',
            meetingAdminEmail: '',
            meetingName: '',
            meetingDescription: '',
            meetingProposedDatesAndTimes: [],
            attendantsAcceptedDatesAndTimes: {}
        }

        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    }

    async componentWillMount(){
        let newState = {};

        if(!this.props.nonMember){
            try{
                const invitation = await axios.get('/invitations/' + this.props.match.params.invitation_id);
                const invitationsByMeetingId = await axios.get('/invitations?meeting_id=' + invitation.data.meeting_id);
                const meeting = await axios.get('/meetings/' + invitation.data.meeting_id);
                const user = await axios.get('/users/' + meeting.data.initiated_by);

                newState.invitationId = invitation.data.invitation_id;
                newState.attendantEmail = invitation.data.attendant_email;
                newState.meetingId = invitation.data.meeting_id;
                let acceptedDatesAndTimes = {};
                for(let i = 0; i < invitationsByMeetingId.data.length; i++){
                    acceptedDatesAndTimes[invitationsByMeetingId.data[i].attendant_email] = JSON.parse(invitationsByMeetingId.data[i].accepted_dates_and_times);
                }
                newState.attendantsAcceptedDatesAndTimes = acceptedDatesAndTimes;
                newState.meetingName = meeting.data.meeting_name;
                newState.meetingDescription = meeting.data.meeting_description;
                newState.meetingProposedDatesAndTimes = JSON.parse(meeting.data.proposed_dates_and_times);

                newState.meetingAdmin = user.data.user_name;
                newState.meetingAdminEmail = user.data.email;
                console.log('new state:', newState);
                this.setState(newState);
            }catch(err){
                console.log('meeting err:', err);
                this.props.handleError();
            }
        }

        if(this.props.nonMember){
            try{
                const invitation = await axios.get('/nonMemberInvitations/' + this.props.match.params.invitation_id);
                const invitationsByMeetingId = await  axios.get('/nonMemberInvitations?meetingId=' + invitation.data.meetingId);
                const meeting = await axios.get('/nonMemberMeetings/' + invitation.data.meetingId);
                newState.invitationId = invitation.data.invitationId;
                newState.attendantEmail = invitation.data.attendantEmail;
                newState.meetingId = invitation.data.meetingId;
                let acceptedDatesAndTimes = {};
                for(let i = 0; i < invitationsByMeetingId.data.length; i++){
                    acceptedDatesAndTimes[invitationsByMeetingId.data[i].attendantEmail] = JSON.parse(invitationsByMeetingId.data[i].acceptedDatesAndTimes);
                }
                newState.attendantsAcceptedDatesAndTimes = acceptedDatesAndTimes;
                newState.meetingName = meeting.data.meetingName;
                newState.meetingDescription = meeting.data.meetingDescription;
                newState.meetingProposedDatesAndTimes = JSON.parse(meeting.data.proposedDatesAndTimes);
                newState.meetingAdmin = meeting.data.username;
                newState.meetingAdminEmail = meeting.data.userEmail;

                console.log('new state:', newState);
                this.setState(newState);
            }catch(err){
                console.log('meeting err:', err);
                this.props.handleError();
            }
        }
    }

    async handleSubmitClick(event){
        if(!this.props.nonMember){
            try{
                await axios.put('/invitations/' + this.state.invitationId, {acceptedDatesAndTimes: this.state.attendantsAcceptedDatesAndTimes[this.state.attendantEmail]});
                this.props.history.replace({pathname:'/'}); 
            }catch(err){
                console.log(err);
                this.props.handleError();
            }
        }

        if(this.props.nonMember){
            try{
                await axios.put('/nonMemberInvitations/' + this.state.invitationId, {acceptedDatesAndTimes: this.state.attendantsAcceptedDatesAndTimes[this.state.attendantEmail]})
                this.props.history.replace({pathname:'/'}); 
            }catch(err){
                console.log(err);
                this.props.handleError();
            }
        }
    }

    handleCheckboxChange(event){
        let newAttendantsAcceptedDatesAndTimes = this.state.attendantsAcceptedDatesAndTimes;
        if(event.target.checked){
            newAttendantsAcceptedDatesAndTimes[this.state.attendantEmail][event.target.name] = this.state.meetingProposedDatesAndTimes[event.target.name];
        } else {
            newAttendantsAcceptedDatesAndTimes[this.state.attendantEmail][event.target.name] = null;
        }
        this.setState({
            attendantsAcceptedDatesAndTimes: newAttendantsAcceptedDatesAndTimes,
        });
    }

    render() {
        return (
            <Panel>
                <p>Hello <strong>{this.state.attendantEmail}</strong>!</p>
                <p>You are invited by {this.state.meetingAdmin} to attend the following meeting:</p>
                <p>Meeting name: {this.state.meetingName}</p>
                { this.state.meetingDescription ? <p>Meeting description: {this.state.meetingDescription}</p> : null }
                <p>Please choose when would you like the meeting to be:</p>
                <Table responsive>
                    <TableHeader meetingProposedDatesAndTimes={this.state.meetingProposedDatesAndTimes}/>
                    <tbody>
                        <CurrentAttendant 
                            attendantEmail={this.state.attendantEmail} 
                            attendantsAcceptedDatesAndTimes={this.state.attendantsAcceptedDatesAndTimes} 
                            handleCheckboxChange={this.handleCheckboxChange}
                        />
                        {
                            Object.keys(this.state.attendantsAcceptedDatesAndTimes)
                                .filter(email => email !== this.state.attendantEmail)
                                .map(
                                    (email, index) =>
                                    <OtherAttendant 
                                        key={'oa' + index} 
                                        index={index} 
                                        attendantEmail={email} 
                                        attendantsAcceptedDatesAndTimes={this.state.attendantsAcceptedDatesAndTimes}
                                    />
                                )
                        }
                    </tbody>
                </Table>
                <FormGroup>
                    <Button bsStyle="primary" onClick={this.handleSubmitClick}>Submit</Button>
                </FormGroup>
            </Panel>
        );
    }
}

Meeting.propTypes = {
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    nonMember: PropTypes.bool.isRequired,
    handleError: PropTypes.func.isRequired,
}

function TableHeader({meetingProposedDatesAndTimes}){
    return (
        <thead>
            <tr>
                <th></th>
                { meetingProposedDatesAndTimes.map((element, index) => <th key={'th' + index}>{'Start: ' + element.startDate}<br/>{'End: ' + element.endDate}</th>) }
            </tr>
        </thead>
    );
}

function CurrentAttendant({handleCheckboxChange, attendantEmail, attendantsAcceptedDatesAndTimes}){
    let attendantAcceptedDatesAndTimes = null;
    if(attendantEmail){
        attendantAcceptedDatesAndTimes = attendantsAcceptedDatesAndTimes[attendantEmail];
    }
    return (
        <tr key='catr'>
            <td key='catd'>{attendantEmail}</td>
            {
                attendantAcceptedDatesAndTimes ? attendantAcceptedDatesAndTimes.map(
                    (dateAndTime, index) => 
                    <td key={'cadt' + index}>
                        <FormGroup><Checkbox 
                                name={index} 
                                onChange={handleCheckboxChange} 
                                checked={dateAndTime ? true : false}
                            ></Checkbox>
                        </FormGroup>
                    </td>
                ) : null
            } 
        </tr>
    );
}

function OtherAttendant({index, attendantEmail, attendantsAcceptedDatesAndTimes}){
    return (
        <tr key={'oatr' + index}>
            <td key={'oatd' + index}>{attendantEmail}</td>
            {
                attendantsAcceptedDatesAndTimes[attendantEmail].map((dateAndTime, index)=>
                    <td key={'dttd' + index}>
                        {
                            ( ()=>{
                                if(dateAndTime){
                                    return <i className="fa fa-check-square-o" aria-hidden="true"></i>        
                                } else {
                                    return <i className="fa fa-square-o" aria-hidden="true"></i>
                                }
                            })()
                        }
                    </td>
                ) 
            }
        </tr>
    );
}

export default Meeting;
