import React, { Component } from 'react';
import { Button, Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';

class MeetingSetupEnd extends Component {
    constructor(props){
        super(props);
        this.handleHomeClick = this.handleHomeClick.bind(this);
    }

    handleHomeClick(event){
        this.props.history.replace('/');
    }

    render() {
        return (
            <Panel>
                <p>Thank you for using YAMP!</p>
                <p>An email will be sent to you with a link where you can see the status and administrate the meeting.</p>
                <Button bsStyle="primary" onClick={this.handleHomeClick}>Home</Button>
            </Panel>
        );
    }
}

MeetingSetupEnd.propTypes = {
    history: PropTypes.object.isRequired,
}

module.exports = MeetingSetupEnd; 
