import React, { Component } from 'react';
import { Alert, FormControl, FormGroup, ControlLabel, Row, Col } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import applyValidation from './Validation';

class MeetingDescription extends Component {
    constructor(props){
        super(props);
        this.performValidation = this.performValidation.bind(this);
    }

    performValidation(schemaName, event){
        return this.props.validate(schemaName, event).then(()=>{
            if(Object.keys(this.props.errors).length > 0){
                this.props.setErrorsOnMeetingDescription(true);
            } else {
                this.props.setErrorsOnMeetingDescription(false);
            }
        });
    }

    render() {
        return (
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <h4>Meeting description</h4>
                    { this.props.showFillInAllRequiredFieldsErrorMessage && <MeetingDescriptionErrorMessage {...this.props}/>}
                    <ReactTooltip place="right" type="error" effect="float" globalEventOff='click'/>
                    <FormGroup validationState={!this.props.errors.meeting_name ? null : "error"}>
                        <ControlLabel>Meeting name<sup>*</sup></ControlLabel>
                        <FormControl 
                            type="text" 
                            name="meeting_name" 
                            placeholder="Meeting name" 
                            value={this.props.meeting_name} 
                            onChange={this.props.handleInputChange}/>
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Meeting description</ControlLabel>
                        <FormControl 
                            componentClass="textarea" 
                            placeholder="Meeting description" 
                            name="meeting_description" 
                            value={this.props.meeting_description} 
                            onChange={this.props.handleInputChange}/>
                    </FormGroup>
                    <FormGroup validationState={!this.props.errors.user_name ? null : "error"}>
                        <ControlLabel>User name<sup>*</sup></ControlLabel>
                        <FormControl 
                            type="text" 
                            name="user_name" 
                            placeholder="User name" 
                            value={this.props.user_name} 
                            onChange={this.props.handleInputChange}/>
                    </FormGroup>
                    <FormGroup validationState={!this.props.errors.user_email ? null : "error"}>
                        <ControlLabel>Email address<sup>*</sup> <small>(used to send a link to administer your meeting)</small></ControlLabel>
                        <FormControl 
                            type="text" 
                            name="user_email" 
                            placeholder="User email" 
                            value={this.props.user_email} 
                            data-tip={this.props.errors.user_email || ''}
                            onBlur={this.performValidation.bind(null, "valid_email")} 
                            onChange={this.props.handleInputChange}/>
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}

function MeetingDescriptionErrorMessage(props){
    return  <Alert bsStyle="danger">
        Please fill in all required fields:
        <ul>
            {props.showFillInAllRequiredFieldsErrorMessage.meeting_name_error ? <li>Meeting name</li> : ''} 
            {props.showFillInAllRequiredFieldsErrorMessage.user_name_error ? <li>User name</li> : ''} 
            {props.showFillInAllRequiredFieldsErrorMessage.user_email_error ? <li>User email</li> : ''} 
        </ul>
    </Alert>;
}

module.exports = applyValidation(MeetingDescription); 
