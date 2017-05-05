import React, { Component } from 'react';
import { Button, Image, PageHeader, Grid, Row, Col } from 'react-bootstrap';

class Header extends Component {
    constructor(props){
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
    }

    handleLoginClick(){
        this.props.appHistory.push("/login"); 
    }

    handleRegisterClick(){
        this.props.appHistory.push("/register");
    }

    render() {
        return (
            <PageHeader>
                <Grid className="header">
                    <Row>
                        <Col xs={9} sm={9} md={9} lg={9}>
                            <Image src="/yamp_logo_small.png"/>
                <small className="header-text">Yet Another Meeting Planner</small>
                        </Col>
                        <Col xs={3} sm={3} md={3} lg={3}>
                            <Button bsStyle="primary" className="headerLoginButton" onClick={this.handleLoginClick}>Log in</Button>
                            <Button bsStyle="primary" className="headerRegisterButton" onClick={this.handleRegisterClick}>Register</Button>
                        </Col>
                    </Row>
                </Grid>
            </PageHeader>
        );
    }
}

export default Header;
