import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Row, Col } from 'react-bootstrap';

class MeetingDescription extends Component {
    render() {
        return (
            <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                    <h4>Meeting description</h4>
                    <FormGroup>
                        <ControlLabel>Title</ControlLabel>
                        <FormControl type="text" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Description <small>(optional)</small></ControlLabel>
                        <FormControl componentClass="textarea" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Your name</ControlLabel>
                        <FormControl type="text" />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Email address <small>(used to send a link to administer your meeting)</small></ControlLabel>
                        <FormControl type="email" />
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}

module.exports = MeetingDescription; 
