import React, { Component } from 'react';
import { Button, Image, PageHeader, Grid, Row, Col } from 'react-bootstrap';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import './Header.css';

class Header extends Component {
    constructor(props){
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.getClassNameForLogin = this.getClassNameForLogin.bind(this);
    }

    handleLoginClick(){
        this.props.history.push("/login"); 
    }

    handleRegisterClick(){
        this.props.history.push("/register");
    }

    getClassNameForLogin(){
        if(this.props.history.location.pathname === '/register'){
            return 'forLoginAndRegister';
        }
    }

    render() {
        return (
            <PageHeader>
                <Grid className="header">
                    <Row>
                        <Col xs={1} sm={1} md={1} lg={1}>
                            <Image src="/yamp_logo_small.png"/>
                        </Col>
                        <Col className="header-logo-text"  xs={4} sm={4} md={4} lg={4}>
                            <LogoMessage/>
                        </Col>
                        <Col className="header-buttons"  xs={7} sm={7} md={7} lg={7}>
                            { this.props.history.location.pathname === '/register' && !this.props.loggedUser && <LoginHeaderMessage/> }
                            { this.props.history.location.pathname === '/login' && !this.props.loggedUser  && <RegisterHeaderMessage/> }
                            {' '}
                            { this.props.history.location.pathname !== '/login' && !this.props.loggedUser  && <Button bsStyle="primary" className={this.getClassNameForLogin()} onClick={this.handleLoginClick}>Log in</Button> }
                            {' '}
                            { this.props.history.location.pathname !== '/register' && !this.props.loggedUser && <Button bsStyle="primary" className="forLoginAndRegister" onClick={this.handleRegisterClick}>Register</Button> }
                            { this.props.loggedUser && <LoggedUserDropdownButton loggedUser={this.props.loggedUser} handleLogout={this.props.handleLogout}/> }
                        </Col>
                    </Row>
                </Grid>
            </PageHeader>
        );
    }
}

function LoggedUserDropdownButton(props){
    return  <DropdownButton bsStyle="primary" title={props.loggedUser.name} id="dropdown-size-medium">
        <MenuItem eventKey="1">Settings</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey="2" onClick={props.handleLogout}>Logout</MenuItem>
    </DropdownButton>
}

function LogoMessage(){
    return <span className="header-text">Yet Another Meeting Planner</span>
}

function RegisterHeaderMessage(){
    return <span className="header-text">Already have an account?</span>
}

function LoginHeaderMessage(){
    return <span className="header-text">New to YAMP?</span>
}

export default Header;
