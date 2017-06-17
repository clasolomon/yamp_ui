import React, {Component} from 'react';
import { Alert, Panel, Button, Image } from 'react-bootstrap';
import { Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import applyValidation from '../Validation';
import axios from '../axios-instance';
import './Register.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showErrorMessageAlreadyUsedEmail: false,
            showErrorMessageFillInAllRequiredFields: false,
            showErrorMessagePasswordDoesNotMatch: false,
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.performEmailValidation = this.performEmailValidation.bind(this);
        this.checkIfConfirmPasswordMatchesPassword = this.checkIfConfirmPasswordMatchesPassword.bind(this);
    }

    handleInputChange(event){
        const name = event.target.name;
        const value = event.target.value;

        let newState = this.state;
        newState[name] = value;

        if(newState.username && newState.email && newState.password && newState.confirmPassword){
            newState.showErrorMessageFillInAllRequiredFields = false;
        }

        this.setState(newState);
    }

    handleCancelClick(event){
        this.props.history.replace('/');
    }

    handleRegisterClick(event){
        // check if there are any empty fields
        if(!this.state.username || !this.state.email || !this.state.password || !this.state.confirmPassword){
            this.setState({ showErrorMessageFillInAllRequiredFields: true });
            return;
        }

        // check if there are any validation errors or any error message displayed
        if(this.state.showErrorMessageAlreadyUsedEmail || this.state.showErrorMessageFillInAllRequiredFields || this.state.showErrorMessagePasswordDoesNotMatch || Object.keys(this.props.errors).length > 0){
            return;
        }

        // make request to create new user
        let newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            isMember: true
        }
        axios.post('/users', newUser)
            .then(
                (response)=>{
                    console.log('TBD response:', response);
                    // redirect to login view
                    this.props.history.push({pathname:'/login', state:{email: response.data.email, showMessageAfterRegistration: true}}); 
                }
            )
            .catch(
                (err)=>{
                    this.props.handleError();
                }
            );
    }

    checkIfConfirmPasswordMatchesPassword(event){
        if(this.state.password && this.state.confirmPassword && this.state.password !== this.state.confirmPassword){
            this.setState({ showErrorMessagePasswordDoesNotMatch: true });
        } else {
            this.setState({ showErrorMessagePasswordDoesNotMatch: false });
        }
    }

    performEmailValidation(schemaName, event){
        console.log('TBD performEmailValidation:', event.target.value);
        let email = event.target.value;
        // first check if it is a valid email
        return this.props.validate(schemaName, event)
            .then(
                ()=>{
                    if(Object.keys(this.props.errors).length > 0){
                        return;
                    } else {
                        // then check if the email belongs to a member
                        if(email){
                            return axios.get('/users?email=' + email)
                                .then(
                                    (response)=>{
                                        console.log('get user by email:', response);
                                        if(response.data.email){
                                            this.setState({ showErrorMessageAlreadyUsedEmail: true });
                                        } else {
                                            this.setState({ showErrorMessageAlreadyUsedEmail: false });
                                        }
                                    }
                                )
                        }
                    }
                }
            )
            .catch(
                (err)=>{
                    console.log(err);
                    this.props.handleError();
                }
            );
    }

    render(){
        return (
            <Panel className="register">
                <Image src="/yamp_logo.png"/>
                <RegisterMessage/>
                <br/>
                { this.state.showErrorMessageAlreadyUsedEmail && <AlreadyUsedEmailErrorMessage/> }
                { this.state.showErrorMessageFillInAllRequiredFields && <FillInAllRequiredFieldsErrorMessage {...this.state}/> } 
                { this.state.showErrorMessagePasswordDoesNotMatch && <PasswordDoesNotMatchErrorMessage/> }
                <ReactTooltip place="right" type="error" effect="float" globalEventOff='click'/>
                <Form className="register-form">
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon>
                                <i className="fa fa-user-o" aria-hidden="true"></i> 
                            </InputGroup.Addon>
                            <FormControl 
                                type="text" 
                                size="40" 
                                name="username" 
                                placeholder="Your name" 
                                value={this.state.username} 
                                onChange={this.handleInputChange}/>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup validationState={!this.props.errors.email ? null : "error"}>
                        <InputGroup>
                            <InputGroup.Addon>
                                <i className="fa fa-envelope-o" aria-hidden="true"></i>
                            </InputGroup.Addon>
                            <FormControl 
                                type="text" 
                                size="40" 
                                name="email" 
                                placeholder="Email address" 
                                value={this.state.email} 
                                data-tip={this.props.errors.email || ''}
                                onChange={this.handleInputChange} 
                                onBlur={this.performEmailValidation.bind(null, "valid_email")}/>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
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
                                onBlur={this.checkIfConfirmPasswordMatchesPassword}
                                onChange={this.handleInputChange}/>
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup>
                            <InputGroup.Addon>
                                <i className="fa fa-key" aria-hidden="true"></i>
                            </InputGroup.Addon>
                            <FormControl 
                                type="password" 
                                size="40" 
                                name="confirmPassword" 
                                placeholder="Confirm password" 
                                value={this.state.confirmPassword} 
                                onBlur={this.checkIfConfirmPasswordMatchesPassword}
                                onChange={this.handleInputChange}/>
                        </InputGroup>
                    </FormGroup>
                    <br/>
                    <FormGroup>
                        <Button bsStyle="primary" onClick={this.handleRegisterClick}>Register</Button>
                        {' '}
                        <Button bsStyle="primary" onClick={this.handleCancelClick}>Cancel</Button>
                    </FormGroup>
                </Form>
            </Panel>
        );
    }
}

function RegisterMessage(props){
    return <h4>Create free account</h4>;
}

function PasswordDoesNotMatchErrorMessage(props){
    return <Alert bsStyle="danger" className="errorMessage">Passwords do not match!</Alert>;
}

function AlreadyUsedEmailErrorMessage(props){
    return <Alert bsStyle="danger" className="errorMessage">An account already exists with this email!</Alert>;
}

function FillInAllRequiredFieldsErrorMessage(props){
    return  <Alert bsStyle="danger" className="errorMessage">
        Please fill in all required fields:
        <ul>
            {props.username ? '' : <li>Name</li>} 
            {props.email ? '' : <li>Email address</li>} 
            {props.password ? '' : <li>Password</li>} 
            {props.confirmPassword ? '' : <li>Password confirmation</li>} 
        </ul>
    </Alert>;
}

export default applyValidation(Register);
