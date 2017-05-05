import React, {Component} from 'react';
import { Panel, Button } from 'react-bootstrap';
import { FormControl, ControlLabel, FormGroup, Form } from 'react-bootstrap';
import axios from './axios-instance';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            email: '',
            password: '',
            passwordConfirm: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }

    handleInputChange(event){
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    handleCancelClick(){
        this.props.history.push('/');
    }

    handleRegisterClick(event){
        axios.post('/register', this.state)
            .then((response)=>{
                if(response.data.exists){
                    this.props.history.push({pathname:'/login', state:{showMessageAlreadyRegistered: true, email: response.data.email}}); 
                    return;
                }
                if(response.data){
                    this.props.history.push({pathname:'/login', state:{showMessageAfterRegistration: true, email: response.data.email}}); 
                }
                console.log(response);
            })
            .catch((error)=>{
                console.log(error);
            });
    }

    render(){
        return (
            <Panel className="register">
                <Form>
                    <RegisterMessage/>
                    <FormGroup>
                        <ControlLabel>Your name</ControlLabel>
                            <FormControl type="text" size="40" name="user_name" placeholder="Your name" value={this.state.user_name} onChange={this.handleInputChange}/>
                    </FormGroup>
                    <br/>
                    <FormGroup>
                        <ControlLabel>Email address</ControlLabel>
                        <FormControl type="email" size="40" name="email" placeholder="Email address" value={this.state.email} onChange={this.handleInputChange}/>
                    </FormGroup>
                    <br/>
                    <FormGroup>
                        <ControlLabel>Password</ControlLabel>
                        <FormControl  type="password" size="40" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>
                        <br/>
                        <FormControl  type="password" size="40" name="passwordConfirm" placeholder="Confirm password" value={this.state.passwordConfirm} onChange={this.handleInputChange}/>
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
export default Register;
