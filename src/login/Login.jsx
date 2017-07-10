import React, {Component} from 'react';
import { Alert, Button, Image, Panel } from 'react-bootstrap';
import { Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from '../axios-instance';
import './Login.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showErrorMessageWrongEmailOrPassword: false,
            showMessageAfterRegistration: false,
            email: '',
            password: ''
        }
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event){
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    handleLoginClick(event){
        // return if email or password are missing
        if(!this.state.email || !this.state.password){
            return;
        }

        axios.post('/login', {email: this.state.email, password: this.state.password})
            .then((response)=>{
                this.props.history.push({pathname:'/', state:{userId: response.data.user_id, username: response.data.user_name, email: response.data.email}}); 
            })
            .catch((err)=>{
                if(err.response && err.response.status === 401){ // if unauthorized
                    this.setState({
                        showErrorMessageWrongEmailOrPassword: true,
                        showMessageAfterRegistration: false
                    });
                    return;
                }
                this.props.handleError();
            });
    }

    handleCancelClick(event){
        this.props.history.push('/');
    }

    componentWillMount(){
        if(this.props.match.isExact && this.props.location.state){
            this.setState(this.props.location.state);
        }
    }

    renderRegistrationMessage(){
        if(this.state.showMessageAfterRegistration){
            return (
                <RegistrationMessage/>
            );
        }
        return null;
    }

    renderWrongEmailOrPasswordErrorMessage(){
        if(this.state.showErrorMessageWrongEmailOrPassword){
            return (
                <WrongEmailOrPasswordErrorMessage/>
            );
        }
        return null;
    }

    render(){
        return (
            <Panel className="login">
                <Image src="/yamp_logo.png"/>
                <LoginMessage/>
                <br/>
                { this.renderRegistrationMessage() }
                { this.renderWrongEmailOrPasswordErrorMessage() }
                <Form>
                    <InputGroup>
                        <InputGroup.Addon>
                            <i className="fa fa-envelope-o" aria-hidden="true"></i>
                        </InputGroup.Addon>
                        <FormControl 
                            type="email" 
                            size="40" 
                            name="email" 
                            placeholder="Email address" 
                            value={this.state.email} 
                            onChange={this.handleInputChange}
                        />
                    </InputGroup>
                    <br/>
                    <InputGroup>
                        <InputGroup.Addon>
                            <i className="fa fa-key" aria-hidden="true"></i>
                        </InputGroup.Addon>
                        <FormControl 
                            type="password" 
                            size="40" 
                            name="password" 
                            placeholder="Password" 
                            value={this.state.password} 
                            onChange={this.handleInputChange}
                        />
                    </InputGroup>
                    <br/>
                    <FormGroup>
                        <Button bsStyle="primary" onClick={this.handleLoginClick}>Log In</Button>
                        {' '}
                        <Button bsStyle="primary" onClick={this.handleCancelClick}>Cancel</Button>
                    </FormGroup>
                </Form>
            </Panel>
        );
    }
}

Login.propTypes = {
    history: PropTypes.object,
    match: PropTypes.object,
    location: PropTypes.object,
    handleError: PropTypes.func
}

function WrongEmailOrPasswordErrorMessage(props){
    return (
        <Alert bsStyle="danger">Wrong email or password</Alert>
    );
}

function LoginMessage(props) {
    return (
        <h4>Log in to your account</h4>
    );
}

function RegistrationMessage(props) {
    return (
        <Alert><h4>Your account has been created!</h4></Alert>
    );
}

export default Login;
