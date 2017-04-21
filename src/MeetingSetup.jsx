import React, { Component } from 'react';
import MeetingDatesAndTimes from './MeetingDatesAndTimes';
import MeetingDescription from './MeetingDescription';
import MeetingInvitations from './MeetingInvitations';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';

class MeetingSetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            showMeetingDescription: true,
            showMeetingDatesAndTimes: false,
            showMeetingInvitations: false,
            showNextButton: true, 
            showPreviousButton: false,
            showSubmitButton: false,
            datesAndTimes: [{}, {}, {}],
            inviteEmails: [null, null, null, null, null, null]
        };

        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePreviousClick = this.handlePreviousClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNewDateAndTime = this.handleNewDateAndTime.bind(this);
        this.handleAddDateAndTime = this.handleAddDateAndTime.bind(this);
        this.handleDeleteDateAndTime = this.handleDeleteDateAndTime.bind(this);
        this.handleDeleteEmailInvitation = this.handleDeleteEmailInvitation.bind(this);
    }

    handleNewDateAndTime(index, startDate, endDate){
        let newDatesAndTimes = this.state.datesAndTimes;
        if(startDate) newDatesAndTimes[index].startDate = startDate;
        if(endDate) newDatesAndTimes[index].endDate = endDate;
        this.setState({datesAndTimes: newDatesAndTimes});
    }

    handleDeleteEmailInvitation(index){
        let newInviteEmails = this.state.inviteEmails.filter((element, elementIndex)=> { return elementIndex !== index; });
    }

    handleDeleteDateAndTime(index){
        let newDatesAndTimes = this.state.datesAndTimes.filter((element, elementIndex)=>{ return elementIndex !== index; });
        this.setState({datesAndTimes: newDatesAndTimes});
    }

    handleAddDateAndTime(){
        this.state.datesAndTimes.push(null);
        this.setState({datesAndTimes: this.state.datesAndTimes});
    }

    handleNextClick(event){
        if(this.state.page === 0){
            this.setState({
                page: 1,
                showMeetingDescription: false,
                showMeetingDatesAndTimes: true,
                showNextButton: true, 
                showPreviousButton: true
            });
        } else if(this.state.page === 1){
            this.setState({
                page: 2,
                showMeetingDatesAndTimes: false,
                showMeetingInvitations: true,
                showNextButton: false, 
                showPreviousButton: true,
                showSubmitButton: true
            });
        }
    }

    handlePreviousClick(event){
        if(this.state.page === 2){
            this.setState({
                page: 1,
                showMeetingDatesAndTimes: true,
                showMeetingInvitations: false,
                showNextButton: true, 
                showPreviousButton: true,
                showSubmitButton: false
            });
        } else if(this.state.page === 1){
            this.setState({
                page: 0,
                showMeetingDescription: true,
                showMeetingDatesAndTimes: false,
                showNextButton: true, 
                showPreviousButton: false
            });
        }
    }

    handleSubmit(event){
        event.preventDefault();
        console.log("Submit");
    }


    render(){
        return(
            <Grid className="meetingSetup">
                { this.state.showMeetingDescription && <MeetingDescription/> }
                { this.state.showMeetingDatesAndTimes && <MeetingDatesAndTimes onAddDateAndTime={this.handleAddDateAndTime} onDeleteDateAndTime={this.handleDeleteDateAndTime} onNewDateAndTime={this.handleNewDateAndTime} datesAndTimes={this.state.datesAndTimes}/> }
                { this.state.showMeetingInvitations && <MeetingInvitations onDeleteEmailInvitation={this.handleDeleteEmailInvitation} inviteEmails={this.state.inviteEmails}/> }
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <br/>
                        { this.state.showPreviousButton && <Button id="meetingSetup-previous" bsStyle="primary" bsSize="small" onClick={this.handlePreviousClick}> Previous </Button> }
                        {' '}
                        { this.state.showNextButton && <Button id="meetingSetup-next" bsStyle="primary" bsSize="small" onClick={this.handleNextClick}> Next </Button> }
                        {' '}
                        { this.state.showSubmitButton && <Button id="meetingSetup-submit" bsStyle="primary" bsSize="small" onClick={this.handleSubmit}> Submit </Button> }
                    </Col>
                </Row>
            </Grid>
        );
    }
}

module.exports = MeetingSetup;
