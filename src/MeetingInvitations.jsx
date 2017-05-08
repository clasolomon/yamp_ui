import React, { Component } from 'react';
import { Form, FormControl, FormGroup, ControlLabel, Button, Row, Col } from 'react-bootstrap';

class MeetingInvitations extends Component {
    constructor(props){
        super(props);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleAddClick= this.handleAddClick.bind(this);
    }

    handleDeleteClick(index){
        this.props.onDeleteEmailInvitation(index);
    }

    handleAddClick(event){
        this.props.onAddEmailInvitation();
    }

    render(){
        return(
            <Form>
                <h4>Meeting invitations</h4>
                {console.log("MeetingInvitations:", this.props.inviteEmails)}
                {
                    this.props.inviteEmails.map((currentValue, index)=>
                        <Row key={"mir" + index}>
                            <Col xs={10} sm={10} md={10} lg={10} key={"mic1" + index}>
                                <FormGroup key={"mifg" + index}>
                                    <FormControl key={"mifc" + index} placeholder="Email address" type="text" />
                                </FormGroup>
                            </Col>
                            <Col xs={1} sm={1} md={1} lg={1} key={"mic2" + index}>
                                <Button
                                    key={"mib" + index}
                                    bsStyle="primary"
                                    bsSize="small"
                                    onClick={this.handleDeleteClick.bind(null, index)}
                                >Delete</Button>
                            </Col>
                            <Col xs={1} sm={1} md={1} lg={1} key={"mic3" + index}>
                                {index===this.props.inviteEmails.length-1 ? <Button 
                                    bsStyle="primary" 
                                    bsSize="small" 
                                    onClick={this.handleAddClick}
                                >Add</Button>:null} 
                            </Col>
                        </Row>
                        )}
                    </Form>
        );
    }
}

module.exports = MeetingInvitations; 
