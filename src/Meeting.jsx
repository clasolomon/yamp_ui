import React, { Component } from 'react';
import { Button, FormGroup, Checkbox, Panel, Table } from 'react-bootstrap';
import axios from './axios-instance';

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

    componentWillMount(){
        let newState = {};

        axios.get('/invitations/' + this.props.match.params.invitation_id)
            .then(
                (response)=>{
                    newState.invitationId = response.data.invitation_id;
                    newState.attendantEmail = response.data.attendant_email;
                    newState.meetingId = response.data.meeting_id;
                    return newState.meetingId;
                }
            )
            .then(
                (meeting_id)=>{
                    return axios.get('/invitations?meeting_id=' + meeting_id)
                        .then(
                            (response)=>{
                                let acceptedDatesAndTimes = {};
                                for(let i=0; i<response.data.length; i++){
                                    acceptedDatesAndTimes[response.data[i].attendant_email] = JSON.parse(response.data[i].accepted_dates_and_times);
                                }
                                newState.attendantsAcceptedDatesAndTimes = acceptedDatesAndTimes;
                            }
                        )
                        .then(
                            ()=>{
                                return axios.get('/meetings/' + meeting_id)
                                    .then(
                                        (response)=>{
                                            newState.meetingName = response.data.meeting_name;
                                            newState.meetingDescription = response.data.meeting_description;
                                            newState.meetingProposedDatesAndTimes = JSON.parse(response.data.proposed_dates_and_times);

                                            return response.data.initiated_by;
                                        }
                                    );
                            }
                        )
                }
            )
            .then(
                (user_id)=>{
                    return axios.get('/users/' + user_id)
                        .then(
                            (response)=>{
                                newState.meetingAdmin = response.data.user_name;
                                newState.meetingAdminEmail = response.data.email;
                            }
                        );
                }
            )
            .then(()=>{
                console.log('new state:', newState);
                this.setState(newState);
            })
            .catch((err)=>{
                console.log('meeting err:', err);
                this.props.handleError();
            });
    }

    handleSubmitClick(event){
        axios.put('/invitations/' + this.state.invitationId, {acceptedDatesAndTimes: this.state.attendantsAcceptedDatesAndTimes[this.state.attendantEmail]})
            .then((response)=>{
                this.props.history.replace({pathname:'/'}); 
            })
            .catch((err)=>{
                this.props.handleError();
            });
    }

    handleCheckboxChange(event){
        if(event.target.checked){
            this.state.attendantsAcceptedDatesAndTimes[this.state.attendantEmail][event.target.name] = this.state.meetingProposedDatesAndTimes[event.target.name];
        } else {
            this.state.attendantsAcceptedDatesAndTimes[this.state.attendantEmail][event.target.name] = null;
        }
        this.setState({
            attendantsAcceptedDatesAndTimes: this.state.attendantsAcceptedDatesAndTimes
        });
    }

    render() {
        return (
            <Panel>
                <p>Hello <strong>{this.state.attendantEmail}</strong>!</p>
                <p>You are invited by {this.state.meetingAdmin} to attend the following meeting:</p>
                <p>Meeting name: {this.state.meetingName}</p>
                {this.state.meetingDescription ? <p>Meeting description: {this.state.meetingDescription}</p> : null }
                <p>Please choose when would you like the meeting to be:</p>
                <Table responsive>
                    <TableHeader meetingProposedDatesAndTimes={this.state.meetingProposedDatesAndTimes}/>
                    <tbody>
                        <CurrentAttendant attendantEmail={this.state.attendantEmail} attendantsAcceptedDatesAndTimes={this.state.attendantsAcceptedDatesAndTimes} handleCheckboxChange={this.handleCheckboxChange}/>
                        {
                            Object.keys(this.state.attendantsAcceptedDatesAndTimes).filter(email => email != this.state.attendantEmail).map((email, index) =>
                                <OtherAttendant key={'oa' + index} index={index} attendantEmail={email} attendantsAcceptedDatesAndTimes={this.state.attendantsAcceptedDatesAndTimes}/>
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

function TableHeader(props){
    return (
        <thead>
            <tr>
                <th></th>
                { props.meetingProposedDatesAndTimes.map((element, index) => <th key={'th' + index}>{'Start: ' + element.startDate}<br/>{'End: ' + element.endDate}</th>) }
            </tr>
        </thead>
    );
}

function CurrentAttendant(props){
    let attendantAcceptedDatesAndTimes = null;
    if(props.attendantEmail){
        attendantAcceptedDatesAndTimes = props.attendantsAcceptedDatesAndTimes[props.attendantEmail];
    }
    return (
        <tr key='catr'>
            <td key='catd'>{props.attendantEmail}</td>
            {
                attendantAcceptedDatesAndTimes ? attendantAcceptedDatesAndTimes.map(
                    (dateAndTime, index) => <td key={'cadt' + index}><FormGroup><Checkbox name={index} onChange={props.handleCheckboxChange} checked={dateAndTime?true:false}></Checkbox></FormGroup></td>
                ) : null
            } 
        </tr>
    );
}

function OtherAttendant(props){
    return (
        <tr key={'oatr' + props.index}>
            <td key={'oatd' + props.index}>{props.attendantEmail}</td>
            {
                props.attendantsAcceptedDatesAndTimes[props.attendantEmail].map((dateAndTime, index)=>
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
