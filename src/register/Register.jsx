import React, {Component} from 'react';
import { Panel, Button, Image } from 'react-bootstrap';
import { Form, FormControl, FormGroup, InputGroup } from 'react-bootstrap';
import yup from 'yup';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import applyValidation from '../Validation';
import axios from '../axios-instance';
import './Register.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    handleInputChange(event){
        const {name, value} = event.target;

        let newState = this.state;
        newState[name] = value;

        this.setState(newState);
    }

    handleCancelClick(event){
        this.props.history.replace('/');
    }

    async handleRegisterClick(event){
        // validate the input data
        await this.props.validate({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        });

        // if there are errors return
        if(Object.keys(this.props.errors).length > 0){
            return;
        }

        // make request to create new user
        let newUser = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            isMember: true,
        }

        try{
            const response = await axios.post('/users', newUser);
            this.props.history.push({pathname:'/login', state:{email: response.data.email, showMessageAfterRegistration: true}}); 
        }
        catch(
            err){
            console.log(err);
            this.props.handleError();
        }
    }

    validateInput(event){
        const {name, value} = event.target;
        let input;

        if(name === "confirmPassword" || name === "password"){
            input = {
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            };
        } else {
            input = {
                [name]: value
            };
        }

        this.props.validate(input);
    }

    render(){
        return (
            <Panel className="register">
                <Image src="/yamp_logo.png"/>
                <RegisterMessage/>
                <br/>
                <ReactTooltip 
                    place="right" 
                    type="error" 
                    effect="float" 
                    globalEventOff='click'
                />
                <Form className="register-form">
                    <FormGroup validationState={!this.props.errors.username ? null : "error"}>
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
                                data-tip={this.props.errors.username || ''}
                                onChange={this.handleInputChange}
                                onBlur={this.validateInput}
                            />
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
                                onBlur={this.validateInput}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup validationState={!this.props.errors.password ? null : "error"}>
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
                                data-tip={this.props.errors.password || ''}
                                onChange={this.handleInputChange}
                                onBlur={this.validateInput}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup validationState={!this.props.errors.confirmPassword ? null : "error"}>
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
                                data-tip={this.props.errors.confirmPassword || ''}
                                onChange={this.handleInputChange}
                                onBlur={this.validateInput}
                            />
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

Register.propTypes = {
    errors: PropTypes.object,
    history: PropTypes.object.isRequired,
    validate: PropTypes.func.isRequired,
    handleError: PropTypes.func.isRequired,
}

function RegisterMessage(){
    return (
        <h4>Create free account</h4>
    );
}

const registerSchemaValidation = {
    username: yup.string().min(4, 'User name should have minimum ${min} characters!').required('User name is required!'),// eslint-disable-line no-template-curly-in-string
    email: yup.string().test('email-in-database', 'An account already exists with this email!', 
        async function(email){
            if(email){
                try{
                    await axios.get('/users?email=' + email);
                    return false;
                }catch(err){
                    console.log('err:', err);
                    if(err.response.data.code === 'NotFoundError'){
                        return true;
                    }
                    return false;
                }
            }
        }       
    ).email('Please provide valid email address!').required('Email is required!'),
    password: yup.string().min(4, 'Password length should be minimum ${min} characters!').required('Password is required!'),// eslint-disable-line no-template-curly-in-string
    confirmPassword: yup.string().test('confirmPassword', 'Passwords do not match!', function(value){
        return value === this.parent.password;
    }).required('Password confirm is required!'),
};

export default applyValidation(Register, registerSchemaValidation);
