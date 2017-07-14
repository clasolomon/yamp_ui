import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Row, Col } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

class MeetingDescription extends Component {
    render() {
        return (
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <h4>Meeting description</h4>
                    <ReactTooltip 
                        place="right" 
                        type="error" 
                        effect="float" 
                        globalEventOff='click'
                    />
                    <FormGroup validationState={!this.props.errors.meeting_name ? null : "error"}>
                        <ControlLabel>Meeting name<sup>*</sup></ControlLabel>
                        <FormControl 
                            type="text" 
                            name="meeting_name" 
                            placeholder="Meeting name" 
                            value={this.props.meeting_name} 
                            data-tip={this.props.errors.meeting_name || ''}
                            onChange={this.props.handleInputChange}/>
                    </FormGroup>
                    <FormGroup validationState={!this.props.errors.meeting_description ? null : "error"}>
                        <ControlLabel>Meeting description</ControlLabel>
                        <FormControl 
                            componentClass="textarea" 
                            placeholder="Meeting description" 
                            name="meeting_description" 
                            value={this.props.meeting_description} 
                            data-tip={this.props.errors.meeting_description || ''}
                            onChange={this.props.handleInputChange}/>
                    </FormGroup>
                    <FormGroup validationState={!this.props.errors.user_name ? null : "error"}>
                        <ControlLabel>User name<sup>*</sup></ControlLabel>
                        <FormControl 
                            type="text" 
                            name="user_name" 
                            placeholder="User name" 
                            value={this.props.user_name} 
                            data-tip={this.props.errors.user_name || ''}
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
                            onChange={this.props.handleInputChange}/>
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}

MeetingDescription.propTypes = {
    errors: PropTypes.object,
    handleInputChange: PropTypes.func.isRequired,
    meeting_name: PropTypes.string.isRequired,
    meeting_description: PropTypes.string.isRequired,
    user_name: PropTypes.string.isRequired,
    user_email: PropTypes.string.isRequired,
}

module.exports = MeetingDescription; 
