import React, { Component } from 'react';
import { Alert, Button, Col, Row } from 'react-bootstrap';
import { Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import applyValidation from './Validation';

class MeetingInvitations extends Component {
    constructor(props){
        super(props);
        this.performValidation = this.performValidation.bind(this);
    }

    performValidation(targetName, schemaName, event){
        return this.props.validate(targetName, schemaName, event).then(()=>{
            if(Object.keys(this.props.errors).length > 0){
                this.props.setErrorsOnMeetingInvitations(true);
            } else {
                this.props.setErrorsOnMeetingInvitations(false);
            }
        });
    }

    render(){
        return(
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <h4>Meeting invitations</h4>
                    { this.props.showAtLeastOneEmailInvitationErrorMessage && <AtLeastOneEmailInvitationErrorMessage/>}
                    <ReactTooltip place="right" type="error" effect="float" globalEventOff='click'/>
                    {console.log("MeetingInvitations:", this.props.inviteEmails)}
                    {
                        this.props.inviteEmails.map((element, index)=>
                            <Row key={"mir" + index}>
                                <Col xs={10} sm={10} md={10} lg={10} key={"mic1" + index}>
                                    <FormGroup key={"mifg" + index} validationState={!this.props.errors["mifc" + index] ? null : "error"}>
                                        <InputGroup>
                                            <InputGroup.Addon>
                                                <i className="fa fa-envelope-o" aria-hidden="true"></i>
                                            </InputGroup.Addon>
                                            <FormControl key={"mifc" + index} 
                                                placeholder="Email address" 
                                                type="text" 
                                                name={"mifc" + index}
                                                value={element} 
                                                data-tip={this.props.errors["mifc" + index] || ''}
                                                onBlur={this.performValidation.bind(null, "valid email", "valid_email")} 
                                                onChange={this.props.changeEmailInvitation.bind(null, index)}/>
                                            <FormControl.Feedback />
                                        </InputGroup>
                                    </FormGroup>
                                </Col>
                                <Col xs={1} sm={1} md={1} lg={1} key={"mic2" + index}>
                                    <Button 
                                        key={"mib" + index}
                                        bsStyle="primary"
                                        bsSize="small"
                                        disabled={this.props.inviteEmails.length > 1 ? false : true}
                                        onClick={this.props.deleteEmailInvitation.bind(null, index)}
                                    >Delete</Button> 
                                </Col>
                                <Col xs={1} sm={1} md={1} lg={1} key={"mic3" + index}>
                                    {index===this.props.inviteEmails.length-1 ? <Button 
                                        bsStyle="primary" 
                                        bsSize="small" 
                                        onClick={this.props.addEmailInvitation}
                                    >Add</Button>:null} 
                                </Col>
                            </Row>
                            )}
                        </Col>
                    </Row>
        );
    }
}

function AtLeastOneEmailInvitationErrorMessage(props){
    return <Alert bsStyle="danger">Please submit at least one email invitation</Alert>;
}

module.exports = applyValidation(MeetingInvitations); 
