import React, { Component } from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import yup from 'yup';
import MeetingDatesAndTimes from './MeetingDatesAndTimes';
import MeetingDescription from './MeetingDescription';
import MeetingInvitations from './MeetingInvitations';
import applyValidation from '../Validation';
import axios from '../axios-instance';
import './MeetingSetup.css';

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
            datesAndTimes: [{}], // holds objects describing the dates and times of meetings
            inviteEmails: [''], // holds the emails of the participants
            page: 0, // holds the page index
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
        let newInviteEmails = this.state.inviteEmails;
        newInviteEmails[index] = event.target.value;
        this.setState({inviteEmails: newInviteEmails});
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
    async deleteDateAndTime(index){
        let newDatesAndTimes = this.state.datesAndTimes.filter((element, elementIndex) => { return elementIndex !== index; });
        this.setState({datesAndTimes: newDatesAndTimes});
        // revalidate the dates and times for consistent ReactTooltip error display
        await this.props.validateWithoutPreservingErrors({
            datesAndTimes: newDatesAndTimes,
        });
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
    async deleteEmailInvitation(index){
        let newInviteEmails = this.state.inviteEmails.filter((element, elementIndex) => { return elementIndex !== index; });
        this.setState({inviteEmails: newInviteEmails});
        // revalidate the invite emails for consistent ReactTooltip error display
        await this.props.validateWithoutPreservingErrors({
            inviteEmails: newInviteEmails,
        });
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
    async handleNextClick(event){
        if(this.state.page === 0){
            // validate the input data for page 0
            await this.props.validateWithoutPreservingErrors({
                user_name: this.state.user_name,
                user_email: this.state.user_email,
                meeting_name: this.state.meeting_name,
                meeting_description: this.state.meeting_description,
            });

            // if there are errors return
            if(Object.keys(this.props.errors).length > 0){
                return;
            }

            this.setState({
                page: 1,
            });

            return;
        }

        if(this.state.page === 1){
            // validate the input data for page 1
            await this.props.validateWithoutPreservingErrors({
                datesAndTimes: this.state.datesAndTimes,
            });

            // if there are errors return
            if(Object.keys(this.props.errors).length > 0){
                return;
            }

            this.setState({
                page: 2,
            });

            return;
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
            });
        } else if(this.state.page === 1){
            this.setState({
                page: 0,
            });
        }
    }

    /*
     * Handle submit button click.
     * @param {Event} event - the triggering event
     * */
    async handleSubmit(event){
        // validate the input data for page 2
        await this.props.validateWithoutPreservingErrors({
            inviteEmails: this.state.inviteEmails,
        });

        // if there are errors return
        if(Object.keys(this.props.errors).length > 0){
            return;
        }

        if(this.props.loggedUser){
            let newMeeting = {
                meetingName: this.state.meeting_name,
                meetingDescription: this.state.meeting_description,
                initiatedBy: this.props.loggedUser ? this.props.loggedUser.id : '',
                proposedDatesAndTimes: this.state.datesAndTimes.filter((element) => Object.keys(element).length>0)
            };

            try{
                const meeting = await axios.post('/meetings', newMeeting);
                let inviteEmails = this.state.inviteEmails.filter((element) => element!=='');
                inviteEmails.forEach(
                    (email)=>{
                        let newInvitation = {
                            acceptedDatesAndTimes: new Array(newMeeting.proposedDatesAndTimes.length),
                            meetingId: meeting.data.meeting_id,
                            attendantEmail: email
                        };
                        axios.post('/invitations', newInvitation);
                    }
                );
            }catch(err){
                console.log(err);
                this.props.handleError();
                throw err;
            }
        }

        // if user is NOT logged in
        if(!this.props.loggedUser){
            let newMeeting = {
                meetingName: this.state.meeting_name,
                meetingDescription: this.state.meeting_description,
                username: this.state.user_name,
                userEmail: this.state.user_email,
                proposedDatesAndTimes: this.state.datesAndTimes.filter((element) => Object.keys(element).length>0)
            };

            try{
                const meeting = await axios.post('/nonMemberMeetings', newMeeting);
                let inviteEmails = this.state.inviteEmails.filter((element) => element!=='');
                inviteEmails.forEach(
                    (email)=>{
                        let newInvitation = {
                            acceptedDatesAndTimes: JSON.stringify(new Array(newMeeting.proposedDatesAndTimes.length)),
                            meetingId: meeting.data.meetingId,
                            attendantEmail: email
                        };
                        axios.post('/nonMemberInvitations', newInvitation);
                    }
                );
            }catch(err){
                console.log(err);
                this.props.handleError();
                throw err;
            }
        }

        // navigate to end meeting setup view
        this.props.history.replace('/endMeetingSetup');
    }

    /*
     * Render MeetingDescription subcomponent.
     * */
    renderMeetingDescription(){
        if(this.state.page === 0){
            return(
                <MeetingDescription 
                    errors={this.props.errors}
                    handleInputChange={this.handleInputChange} 
                    meeting_name={this.state.meeting_name} 
                    meeting_description={this.state.meeting_description} 
                    user_name={this.state.user_name} 
                    user_email={this.state.user_email}
                />
            );
        }
        return null;
    }

    /*
     * Render MeetingDatesAndTimes subcomponent.
     * */
    renderMeetingDatesAndTimes(){
        if(this.state.page === 1){
            return(
                <MeetingDatesAndTimes 
                    errors={this.props.errors}
                    addDateAndTime={this.addDateAndTime} 
                    deleteDateAndTime={this.deleteDateAndTime} 
                    changeDateAndTime={this.changeDateAndTime} 
                    datesAndTimes={this.state.datesAndTimes}
                />
            );
        }
        return null;
    }

    /*
     * Render MeetingInvitations subcomponent.
     * */
    renderMeetingInvitations(){
        if(this.state.page === 2){
            return(
                <MeetingInvitations 
                    errors={this.props.errors}
                    addEmailInvitation={this.addEmailInvitation} 
                    changeEmailInvitation={this.changeEmailInvitation}
                    deleteEmailInvitation={this.deleteEmailInvitation} 
                    inviteEmails={this.state.inviteEmails}
                />
            );
        }
        return null;
    }

    /*
     * Render Previous button.
     * */
    renderPreviousButton(){
        if(this.state.page > 0){
            return(
                <Button 
                    id="meetingSetup-previous" 
                    bsStyle="primary" 
                    bsSize="small" 
                    onClick={this.handlePreviousClick}
                > 
                    Previous 
                </Button>
            );
        }
        return null;
    }

    /*
     * Render Next button.
     * */
    renderNextButton(){
        if(this.state.page < 2){
            return(
                <Button 
                    id="meetingSetup-next" 
                    bsStyle="primary" 
                    bsSize="small" 
                    onClick={this.handleNextClick}
                > 
                    Next 
                </Button>
            );
        }
        return null;
    }

    /*
     * Render Submit button.
     * */
    renderSubmitButton(){
        if(this.state.page === 2){
            return(
                <Button 
                    id="meetingSetup-submit" 
                    bsStyle="primary" 
                    bsSize="small" 
                    onClick={this.handleSubmit}
                > 
                    Submit 
                </Button>
            );
        }
        return null;
    }

    /*
     * Render MeetingSetup component.
     * */
    render(){
        return(
            <Grid className="meetingSetup">
                { this.renderMeetingDescription() } 
                { this.renderMeetingDatesAndTimes() } 
                { this.renderMeetingInvitations() } 
                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <br/>
                        { this.renderPreviousButton() }
                        {' '}
                        { this.renderNextButton() }
                        {' '}
                        { this.renderSubmitButton() }
                    </Col>
                </Row>
            </Grid>
        );
    }
}

MeetingSetup.propTypes = {
    history: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    loggedUser: PropTypes.object,
    validate: PropTypes.func.isRequired,
    validateWithoutPreservingErrors: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired,
}

/*
 * Schema validation for MeetingSetup component.
 * */
const meetingSetupSchemaValidation = {
    user_name: yup.string().min(4, 'User name should have minimum ${min} characters!').required('User name is required!'),// eslint-disable-line no-template-curly-in-string
    user_email: yup.string().email('Please provide valid email address!').required('Email is required!'),
    meeting_name: yup.string().min(4, 'Meeting name should be minimum ${min} characters!').required('Meeting name is required!'),// eslint-disable-line no-template-curly-in-string
    meeting_description: yup.string().required('Meeting description is required!'),
    datesAndTimes: yup.array().of(yup.object({startDate: yup.string().test('startDate before endDate', 'Starting date and time must be before ending date and time!', function(start){
        return new Date(start) < new Date(this.parent.endDate);
    }).required('Start date and time is required!'), endDate: yup.string().test('endDate after startDate', 'Ending date and time must be after starting date and time!', function(end){
        return new Date(end) > new Date(this.parent.startDate);
    }).required('End date and time is required!')})).required('Please provide at least one starting and ending date and time!'),
    inviteEmails: yup.array().of(yup.string().email('Please provide valid email address!').required('Email is required!')).required('Please provide at least one email invitation!'),
};

export default applyValidation(MeetingSetup, meetingSetupSchemaValidation);
