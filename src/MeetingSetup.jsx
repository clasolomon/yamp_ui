import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import MeetingDatesAndTimes from './MeetingDatesAndTimes';
import MeetingDescription from './MeetingDescription';
import MeetingInvitations from './MeetingInvitations';
import axios from './axios-instance';

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
            user_name: props.loggedUser ? props.loggedUser.name : '',
            user_email: props.loggedUser ? props.loggedUser.email : '',
            meeting_name: '',
            meeting_description: '',
            datesAndTimes: [{}, {}, {}], // holds objects describing the dates and times of meetings
            inviteEmails: ['', '', ''], // holds the emails of the participants
            page: 0, // holds the page index
            // flags for conditional rendering of components
            showMeetingDescription: true,
            showMeetingDatesAndTimes: false,
            showMeetingInvitations: false,
            showNextButton: true, 
            showPreviousButton: false,
            showSubmitButton: false,
            showAtLeastOneEmailInvitationErrorMessage: false,
            showAtLeastOneDateAndTimeErrorMessage: false,
            showFillInAllRequiredFieldsErrorMessage: false,
            showStartTimeGreaterOrEqualThanEndTimeErrorMessage: false,
            errorsOnMeetingDescription: false,
            errorsOnMeetingInvitations: false
            // end flags section

        };

        // bindings
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePreviousClick = this.handlePreviousClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeDateAndTime = this.changeDateAndTime.bind(this);
        this.addDateAndTime = this.addDateAndTime.bind(this);
        this.deleteDateAndTime = this.deleteDateAndTime.bind(this);
        this.deleteEmailInvitation = this.deleteEmailInvitation.bind(this);
        this.changeEmailInvitation = this.changeEmailInvitation.bind(this);
        this.addEmailInvitation = this.addEmailInvitation.bind(this);
        this.setErrorsOnMeetingDescription = this.setErrorsOnMeetingDescription.bind(this);
        this.setErrorsOnMeetingInvitations = this.setErrorsOnMeetingInvitations.bind(this);
        // end of bindings section
    }

    /*
     * Called to update the state of the component.
     * @param {Event} event - event object triggered by changing an input field
     * */
    handleInputChange(event){
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    /*
     * Called when an email invitation changes in the inviteEmails array.
     * @param {number} index - the index of the element in the inviteEmails array 
     * @param {Event} event - event object containing a string representation of an email address
     * */
    changeEmailInvitation(index, event){
        this.state.inviteEmails[index] = event.target.value;
        this.setState({inviteEmails: this.state.inviteEmails});
    }

    /*
     * Called when either the start date or the end date changes for an object from the datesAndTimes array.
     * @param {number} index - the index of the object in the datesAndTimes array 
     * @param {number} startDate - numeric value corresponding to the time for the specified date
     * @param {number} endDate - numeric value corresponding to the time for the specified date
     * */
    changeDateAndTime(index, startDate, endDate){
        let tempDatesAndTimes = this.state.datesAndTimes;
        if(startDate) tempDatesAndTimes[index].startDate = startDate;
        if(endDate) tempDatesAndTimes[index].endDate = endDate;
        if(tempDatesAndTimes[index].startDate && tempDatesAndTimes[index].endDate && tempDatesAndTimes[index].startDate >= tempDatesAndTimes[index].endDate){
            this.setState({
                datesAndTimes: tempDatesAndTimes,
                showStartTimeGreaterOrEqualThanEndTimeErrorMessage: true
            });
        } else {
            this.setState({
                datesAndTimes: tempDatesAndTimes,
                showStartTimeGreaterOrEqualThanEndTimeErrorMessage: false
            });
        }
    }

    /*
     * Called when the information about the date and time of a meeting is deleted.
     * @param {number} index - the index of the object that was deleted in the datesAndTimes array 
     * */
    deleteDateAndTime(index){
        let newDatesAndTimes = this.state.datesAndTimes.filter((element, elementIndex)=>{ return elementIndex !== index; });
        this.setState({datesAndTimes: newDatesAndTimes});
    }

    /*
     * Called when a new object describing the date and time of a meeting is added.
     * */
    addDateAndTime(){
        this.state.datesAndTimes.push({});
        this.setState({datesAndTimes: this.state.datesAndTimes});
    }

    /*
     * Called when an invitation email is deleted from the email participant list.
     * @param {number} index - the index of the email that was deleted in the inviteEmails array 
     * */
    deleteEmailInvitation(index){
        let newInviteEmails = this.state.inviteEmails.filter((element, elementIndex)=>{ return elementIndex !== index; });
        this.setState({inviteEmails: newInviteEmails});
    }

    /*
     * Called when a new email invitation is added.
     * */
    addEmailInvitation(){
        this.state.inviteEmails.push('');
        this.setState({inviteEmails: this.state.inviteEmails});
    }

    /*
     * Handle next button click.
     * @param {Event} event - the triggering event
     * */
    handleNextClick(event){
        if(this.state.page === 0){
            // if at least one required field is empty, show the fill in all required fields error message
            if(!this.state.meeting_name || !this.state.user_name || !this.state.user_email){
                this.setState({
                    showFillInAllRequiredFieldsErrorMessage: {
                        meeting_name_error: this.state.meeting_name ? false : true,
                        user_name_error: this.state.user_name ? false : true,
                        user_email_error: this.state.user_email ? false : true
                    }
                });
                return;
            } else {
                this.setState({showFillInAllRequiredFieldsErrorMessage: false});
            }

            // if there are errors do not go to next page
            if(this.state.errorsOnMeetingDescription){
                return; 
            }

            this.setState({
                page: 1,
                showMeetingDescription: false,
                showMeetingDatesAndTimes: true,
                showNextButton: true, 
                showPreviousButton: true
            });
        }

        if(this.state.page === 1){
            // check that at least one date and time is specified
            let atLeastOneDateAndTime = false;
            for(let i=0; i < this.state.datesAndTimes.length; i++){
                if(this.state.datesAndTimes[i].startDate && this.state.datesAndTimes[i].endDate){
                    atLeastOneDateAndTime = true;
                    break;
                }
            }

            this.setState({showAtLeastOneDateAndTimeErrorMessage: !atLeastOneDateAndTime}); 

            if(!atLeastOneDateAndTime || this.state.showStartTimeGreaterOrEqualThanEndTimeErrorMessage){
                return;
            }

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
        // check that at least one email invitation is specified
        let atLeastOneEmailInvitation = false;
        for(let i=0; i < this.state.inviteEmails.length; i++){
            if(this.state.inviteEmails[i]){
                atLeastOneEmailInvitation = true;
                break;
            }
        }

        this.setState({showAtLeastOneEmailInvitationErrorMessage: !atLeastOneEmailInvitation}); 

        // if no email invitation is specified return, do not go further
        if(!atLeastOneEmailInvitation){
            return;
        }

        // if there are errors do not submit
        if(this.state.errorsOnMeetingInvitations){
            return; 
        }

        let newMeeting = {
            meetingName: this.state.meeting_name,
            meetingDescription: this.state.meeting_description,
            initiatedBy: this.props.loggedUser ? this.props.loggedUser.id : '',
            proposedDatesAndTimes: this.state.datesAndTimes.filter((element) => Object.keys(element).length>0)
        };

        if(this.props.loggedUser){
            axios.post('/meetings', newMeeting)
                .then(
                    (response)=>{
                        this.props.history.replace('/endMeetingSetup');
                        return response.data.meetingId;
                    }
                )
                .then(
                    (meetingId)=>{
                        let inviteEmails = this.state.inviteEmails.filter((element) => element!=='');
                        inviteEmails.map(
                            (email)=>{
                                let newInvitation = {
                                    acceptedDatesAndTimes: JSON.stringify(new Array(newMeeting.proposedDatesAndTimes.length)),
                                    meetingId: meetingId,
                                    attendantEmail: email
                                };
                                axios.post('/invitations', newInvitation)
                                    .catch((err)=>{
                                        console.log(err);
                                        this.props.handleError();
                                    });
                            }
                        );
                    }
                )
                .catch(
                    (err)=>{
                        console.log(err);
                        this.props.handleError();
                    }
                );
        }

        // if user is NOT logged in
        if(!this.props.loggedUser){

        }
    }

    /*
     * Set flag if there are errors on meeting description
     * @param {boolean} - true if error, false otherwise
     * */
    setErrorsOnMeetingDescription(hasError){
        this.setState({errorsOnMeetingDescription: hasError});
    }

    /*
     * Set flag if there are errors on meeting invitations
     * @param {boolean} - true if error, false otherwise
     * */
    setErrorsOnMeetingInvitations(hasError){
        this.setState({errorsOnMeetingInvitations: hasError});
    }

    /*
     * Render the component.
     * */
    render(){
        return(
            <Grid className="meetingSetup">
                { this.state.showMeetingDescription && <MeetingDescription 
                    handleInputChange={this.handleInputChange} 
                    showFillInAllRequiredFieldsErrorMessage={this.state.showFillInAllRequiredFieldsErrorMessage}
                    setErrorsOnMeetingDescription={this.setErrorsOnMeetingDescription}
                    meeting_name={this.state.meeting_name} 
                    meeting_description={this.state.meeting_description} 
                    user_name={this.state.user_name} 
                    user_email={this.state.user_email}/> }

                { this.state.showMeetingDatesAndTimes && <MeetingDatesAndTimes 
                    showAtLeastOneDateAndTimeErrorMessage={this.state.showAtLeastOneDateAndTimeErrorMessage}
                    showStartTimeGreaterOrEqualThanEndTimeErrorMessage={this.state.showStartTimeGreaterOrEqualThanEndTimeErrorMessage}
                    addDateAndTime={this.addDateAndTime} 
                    deleteDateAndTime={this.deleteDateAndTime} 
                    changeDateAndTime={this.changeDateAndTime} 
                    datesAndTimes={this.state.datesAndTimes}/> }

                { this.state.showMeetingInvitations && <MeetingInvitations 
                    showAtLeastOneEmailInvitationErrorMessage={this.state.showAtLeastOneEmailInvitationErrorMessage} 
                    setErrorsOnMeetingInvitations={this.setErrorsOnMeetingInvitations}
                    addEmailInvitation={this.addEmailInvitation} 
                    changeEmailInvitation={this.changeEmailInvitation}
                    deleteEmailInvitation={this.deleteEmailInvitation} 
                    inviteEmails={this.state.inviteEmails}/> }

                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <br/>
                        { this.state.showPreviousButton && <Button 
                            id="meetingSetup-previous" 
                            bsStyle="primary" 
                            bsSize="small" 
                            onClick={this.handlePreviousClick}> Previous </Button> }
                        {' '}
                        { this.state.showNextButton && <Button 
                            id="meetingSetup-next" 
                            bsStyle="primary" 
                            bsSize="small" 
                            onClick={this.handleNextClick}> Next </Button> }
                        {' '}
                        { this.state.showSubmitButton && <Button 
                            id="meetingSetup-submit" 
                            bsStyle="primary" 
                            bsSize="small" 
                            onClick={this.handleSubmit}> Submit </Button> }
                    </Col>
                </Row>
            </Grid>
        );
    }
}

module.exports = MeetingSetup;
