import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

class MeetingInvitations extends Component {
    componentDidUpdate(){
        ReactTooltip.rebuild();
    }

    render(){
        return(
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <h4>Meeting invitations</h4>
                    <ReactTooltip 
                        place="right" 
                        type="error" 
                        effect="float" 
                        globalEventOff='click'
                    />
                    {
                        this.props.inviteEmails.map((element, index) =>
                            <Row key={"mir" + index}>
                                <Col xs={10} sm={10} md={10} lg={10} key={"mic1" + index}>
                                    <FormGroup key={"mifg" + index} validationState={!this.props.errors["inviteEmails[" + index + "]"] ? null : "error"}>
                                        <InputGroup>
                                            <InputGroup.Addon>
                                                <i className="fa fa-envelope-o" aria-hidden="true"></i>
                                            </InputGroup.Addon>
                                            <FormControl key={"mifc" + index} 
                                                placeholder="Email address" 
                                                type="text" 
                                                name={"mifc" + index}
                                                value={element} 
                                                data-tip={this.props.errors["inviteEmails[" + index + "]"] || ''}
                                                onChange={this.props.changeEmailInvitation.bind(null, index)}/>
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

MeetingInvitations.propTypes = {
    errors: PropTypes.object,
    inviteEmails: PropTypes.arrayOf(PropTypes.string).isRequired,
    addEmailInvitation: PropTypes.func.isRequired,
    deleteEmailInvitation: PropTypes.func.isRequired,
    changeEmailInvitation: PropTypes.func.isRequired,
}

module.exports = MeetingInvitations; 
