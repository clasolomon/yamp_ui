import React, { Component } from 'react';
import { Pager, Pagination, ListGroup, ListGroupItem, Grid, Row, Col, Table, Button, Panel, FormGroup} from 'react-bootstrap';
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
                        });
                }
            )
            .catch(
                (err)=>{
                    console.log('meeting err:', err);
                    this.props.handleError();
                }
            );
    }

    handleMeetingListItemClick(event){
        console.log('You clicked:', event.target.name);
        let currentMeeting =  this.state.meetings[event.target.name];
        axios.get('/invitations?meeting_id=' + currentMeeting.meeting_id)
            .then(
                (response)=>{
                    console.log('invitations:', response.data);
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
                    console.log('meeting err:', err);
                    this.props.handleError();
                }
            );
    }

    componentWillMount(){
        axios.get('/meetings?initiated_by=' + this.props.loggedUser.id)
            .then(
                (response)=>{
                    console.log('meetings:', response.data);
                    this.setState({ meetings: response.data });
                }
            )
            .catch(
                (err)=>{
                    console.log('meeting err:', err);
                    this.props.handleError();
                }
            );
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={3} sm={3} md={3} lg={3}><MeetingsList meetings={this.state.meetings} handlePlanMeetingClick={this.handlePlanMeetingClick} handleMeetingListItemClick={this.handleMeetingListItemClick}/></Col>
                    <Col xs={9} sm={9} md={9} lg={9}>
                        { this.state.currentMeeting ? <MeetingStatus currentMeeting={this.state.currentMeeting} currentMeetingInvitations={this.state.currentMeetingInvitations} handleDeleteMeetingClick={this.handleDeleteMeetingClick}/> : null }
                    </Col>
                </Row>
            </Grid>
        );
    }
}

class MeetingsList extends Component {
    constructor(props){
        super(props);
        this.state = {
            page: 1,
            numberOfPages: 1        
        };
        this.showItem = this.showItem.bind(this);
        this.previousPage = this.previousPage.bind(this);  
        this.nextPage = this.nextPage.bind(this);  
    }

    componentWillReceiveProps(nextProps){
        this.setState(
            {
                numberOfPages: Math.ceil(nextProps.meetings.length / MeetingsList.ITEMS_PER_PAGE)
            }
        ); 
    }

    static get ITEMS_PER_PAGE() {
        return 3;
    }

    showItem(index){
        if( index >= (this.state.page-1) * MeetingsList.ITEMS_PER_PAGE && index < this.state.page * MeetingsList.ITEMS_PER_PAGE ){
            return true;
        }
        return false;
    }

    previousPage(){
        if(this.state.page > 1){
            this.setState(
                {
                    page: this.state.page - 1
                }
            );
        }
    }

    nextPage(){
        if(this.state.page < this.state.numberOfPages){
            this.setState(
                {
                    page: this.state.page + 1
                }
            );
        }
    }

    render(){
        return (
            <ListGroup className="listGroup">
                <ListGroupItem active className="listGroupHeader">Meetings</ListGroupItem>
                { 
                    this.props.meetings.map(
                        (meeting, index)=>
                        this.showItem(index) ? <ListGroupItem key={"lgi" + index} className="listGroupItem" name={index} onClick={this.props.handleMeetingListItemClick}>{meeting.meeting_name}</ListGroupItem> : null
                    )
                }

                <ListGroupItem active className="listGroupItemPagination">
                    <Pager className="pager">
                        <Pager.Item onClick={this.previousPage}>{"<<"}</Pager.Item>
                        {' ' + this.state.page + ' of ' + this.state.numberOfPages + ' '}
                        <Pager.Item onClick={this.nextPage}>{">>"}</Pager.Item>
                    </Pager>
                </ListGroupItem>
                <ListGroupItem active className="listGroupItemPlanMeeting" onClick={this.props.handlePlanMeetingClick}>Plan new meeting</ListGroupItem>
            </ListGroup>
        );
    }
}

function MeetingStatus(props){
    return (
        <Panel>
            <p>Meeting name: {props.currentMeeting.meeting_name}</p>
            <p>Meeting description: {props.currentMeeting.meeting_description}</p>
            <p>Meeting status:</p>
            <Table responsive>
                <TableHeader meetingProposedDatesAndTimes={JSON.parse(props.currentMeeting.proposed_dates_and_times)}/>
                <tbody>
                    {
                        props.currentMeetingInvitations.map(
                            (invitation, index) =>
                            <Attendant key={'a' + index} index={index} attendantEmail={invitation.attendant_email} acceptedDatesAndTimes={JSON.parse(invitation.accepted_dates_and_times)}/>
                            )
                            }
                        </tbody>
                    </Table>
                    <FormGroup>
                        <Button bsStyle="primary" name={props.currentMeeting.meeting_id} onClick={props.handleDeleteMeetingClick}>Delete meeting</Button>
                    </FormGroup>
                </Panel>
    );
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

function Attendant(props){
    return (
        <tr key={'atr' + props.index}>
            <td key={'atd' + props.index}>{props.attendantEmail}</td>
            {
                props.acceptedDatesAndTimes.map((dateAndTime, index)=>
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

export default Member;
