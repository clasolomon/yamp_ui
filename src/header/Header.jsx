import React, { Component } from 'react';
import { Button, Image, PageHeader, Grid, Row, Col } from 'react-bootstrap';
import './Header.css';

class Header extends Component {
    constructor(props){
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.getClassNameForLogin = this.getClassNameForLogin.bind(this);
    }

    handleLoginClick(){
        this.props.appHistory.push("/login"); 
    }

    handleRegisterClick(){
        this.props.appHistory.push("/register");
    }

    getClassNameForLogin(){
        if(this.props.appHistory.location.pathname === '/register'){
            return 'forLoginAndRegister';
        }
    }

    render() {
        {console.log(this.props.appHistory)}
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
                            { this.props.appHistory.location.pathname === '/register' && <LoginHeaderMessage/> }
                            { this.props.appHistory.location.pathname === '/login'  && <RegisterHeaderMessage/> }
                            {' '}
                            { this.props.appHistory.location.pathname !== '/login' && <Button bsStyle="primary" className={this.getClassNameForLogin()} onClick={this.handleLoginClick}>Log in</Button> }
                            {' '}
                            { this.props.appHistory.location.pathname !== '/register' && <Button bsStyle="primary" className="forLoginAndRegister" onClick={this.handleRegisterClick}>Register</Button> }
                        </Col>
                    </Row>
                </Grid>
            </PageHeader>
        );
    }
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
