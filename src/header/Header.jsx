import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { Button, Image, PageHeader } from 'react-bootstrap';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Header.css';

class Header extends Component {
    constructor(props){
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
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

    renderLoggedUserDropdownButton(){
        if(this.props.loggedUser){
            return (
                <LoggedUserDropdownButton 
                    loggedUser={this.props.loggedUser} 
                    handleLogout={this.props.handleLogout}
                />
            );
        }
        return null;
    }

    renderLoginHeaderMessage(){
        if(this.props.history.location.pathname === '/register' && !this.props.loggedUser){
            return (
                <LoginHeaderMessage/>
            );
        }
        return null;
    }

    renderRegisterHeaderMessage(){
        if(this.props.history.location.pathname === '/login' && !this.props.loggedUser){
            return (
                <RegisterHeaderMessage/>
            );
        }
        return null;
    }

    renderLoginButton(){
        if(this.props.history.location.pathname !== '/login' && !this.props.loggedUser){
            return (
                <Button 
                    bsStyle="primary" 
                    className={this.getClassNameForLogin()} 
                    onClick={this.handleLoginClick}
                >
                    Log in
                </Button>
            );
        }
        return null;
    }

    renderRegisterButton(){
        if(this.props.history.location.pathname !== '/register' && !this.props.loggedUser){
            return (
                <Button 
                    bsStyle="primary" 
                    className="forLoginAndRegister" 
                    onClick={this.handleRegisterClick}
                >
                    Register
                </Button>
            );
        }
        return null;
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
                            { this.renderLoginHeaderMessage() }
                            { this.renderRegisterHeaderMessage() }
                            {' '}
                            { this.renderLoginButton() }
                            {' '}
                            { this.renderRegisterButton() }
                            { this.renderLoggedUserDropdownButton() }
                        </Col>
                    </Row>
                </Grid>
            </PageHeader>
        );
    }
}

Header.propTypes = {
    history: PropTypes.object.isRequired,
    loggedUser: PropTypes.object,
    handleLogout: PropTypes.func.isRequired,
}

function LoggedUserDropdownButton({loggedUser, handleLogout}){
    return  (
        <DropdownButton bsStyle="primary" title={loggedUser.name} id="dropdown-size-medium">
            <MenuItem eventKey="1" onClick={handleLogout}>Logout</MenuItem>
        </DropdownButton>
    );
}

function LogoMessage(){
    return (
        <span className="header-text">Yet Another Meeting Planner</span>
    );
}

function RegisterHeaderMessage(){
    return (
        <span className="header-text">Already have an account?</span>
    );
}

function LoginHeaderMessage(){
    return (
        <span className="header-text">New to YAMP?</span>
    );
}

export default Header;
