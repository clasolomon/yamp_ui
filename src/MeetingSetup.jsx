import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import MeetingDatesAndTimes from './MeetingDatesAndTimes';
import MeetingDescription from './MeetingDescription';
import MeetingInvitations from './MeetingInvitations';
import axios from 'axios';

/*
 * MeetingSetup component renders three other components corresponding to the phase of the meeting setup process:
 * 1. MeetingDescription = name and short description of the meeting + name and email of user
 * 2. MeetingDatesAndTimes = possible dates and times when the meeting might occur
 * 3. MeetingInvitations = emails of the participants
 * */
class MeetingSetup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datesAndTimes: [{}, {}, {}], // holds objects describing the dates and times of meetings
            inviteEmails: [null, null, null], // holds the emails of the participants
            page: 0, // holds the page index
            // flags for conditional rendering of components
            showMeetingDescription: true,
            showMeetingDatesAndTimes: false,
            showMeetingInvitations: false,
            showNextButton: true, 
            showPreviousButton: false,
            showSubmitButton: false
            // end flags section
        };

        // bindings
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePreviousClick = this.handlePreviousClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNewDateAndTime = this.handleNewDateAndTime.bind(this);
        this.handleAddDateAndTime = this.handleAddDateAndTime.bind(this);
        this.handleDeleteDateAndTime = this.handleDeleteDateAndTime.bind(this);
        this.handleDeleteEmailInvitation = this.handleDeleteEmailInvitation.bind(this);
        // end of bindings section
    }

    /*
     * Called when either the start date or the end date changes for an object from the datesAndTimes array.
     * @param {number} index - the index of the object in the datesAndTimes array 
     * @param {number} startDate - numeric value corresponding to the time for the specified date
     * @param {number} endDate - numeric value corresponding to the time for the specified date
     * */
    handleNewDateAndTime(index, startDate, endDate){
        if(startDate) this.state.datesAndTimes[index].startDate = startDate;
        if(endDate) this.state.datesAndTimes[index].endDate = endDate;
        this.setState({datesAndTimes: this.state.datesAndTimes});
    }

    /*
     * Called when the information about the date and time of a meeting is deleted.
     * @param {number} index - the index of the object that was deleted in the datesAndTimes array 
     * */
    handleDeleteDateAndTime(index){
        let newDatesAndTimes = this.state.datesAndTimes.filter((element, elementIndex)=>{ return elementIndex !== index; });
        console.log("newDatesAndTimes:", newDatesAndTimes);
        this.setState({datesAndTimes: newDatesAndTimes});
    }

    /*
     * Called when a new object describing the date and time of a meeting is added.
     * */
    handleAddDateAndTime(){
        this.state.datesAndTimes.push({});
        this.setState({datesAndTimes: this.state.datesAndTimes});
    }

    /*
     * Called when an invitation email is deleted from the email participant list.
     * @param {number} index - the index of the email that was deleted in the inviteEmails array 
     * */
    handleDeleteEmailInvitation(index){
        let newInviteEmails = this.state.inviteEmails.filter((element, elementIndex)=>{ return elementIndex !== index; });
    }

    /*
     * Handle next button click.
     * @param {Event} event - the triggering event
     * */
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

    /*
     * Handle previous button click.
     * @param {Event} event - the triggering event
     * */
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

    /*
     * Handle submit button click.
     * @param {Event} event - the triggering event
     * */
    handleSubmit(event){
        event.preventDefault();
        console.log("Submit");
    }

    /*
     * Render the component.
     * */
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
