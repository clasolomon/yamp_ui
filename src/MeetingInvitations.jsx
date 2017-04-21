import React, { Component } from 'react';
import { FormControl, FormGroup, ControlLabel, Button, Row, Col } from 'react-bootstrap';

class MeetingInvitations extends Component {
    constructor(props){
        super(props);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleDeleteClick(event){
        this.props.onDeleteEmailInvitation();
    }

    render(){
        return(
            <form>
                <h4>Meeting invitations</h4>
                {console.log("MeetingInvitations:", this.props.inviteEmails)}
                {
                    this.props.inviteEmails.map((currentValue, index)=>
                        <Row key={"mir" + index}>
                            <Col xs={8} sm={8} md={8} key={"mic1" + index}>
                                <FormGroup className="mi-formGroup" key={"mifg" + index}>
                                    <ControlLabel key={"micl" + index}>{"Email "+(++index)}</ControlLabel>
                                    <FormControl key={"mifc" + index} type="text" />
                                </FormGroup>
                            </Col>
                            <Col xs={4} sm={4} md={4} key={"mic2" + index}>
                                <Button
                                    key={"mib" + index}
                                    className="mi-deleteButton"
                                    bsStyle="primary"
                                    bsSize="small"
                                    onClick={this.handleDeleteClick.bind(null, index)}
                                >Delete</Button>
                            </Col>
                        </Row>
                        )}
                    </form>
        );
    }
}

module.exports = MeetingInvitations; 
