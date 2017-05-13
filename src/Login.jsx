import React, {Component} from 'react';
import { Alert, Panel, Image, Button } from 'react-bootstrap';
import { Form, FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import axios from './axios-instance';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessageWrongEmailOrPassword: false,
            showMessageAfterRegistration: false,
            showMessageAlreadyRegistered: false,
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

    handleLoginClick(){
        axios.post('/login', {email: this.state.email, password: this.state.password})
            .then((response)=>{
                this.props.history.push({pathname:'/', state:{username: response.data.user_name, email: response.data.email}}); 
            })
            .catch((err)=>{
                this.setState({
                    showMessageWrongEmailOrPassword: true,
                    showMessageAfterRegistration: false,
                    showMessageAlreadyRegistered: false
                });
            });
    }

    handleCancelClick(){
        this.props.history.push('/');
    }

    componentWillMount(){
        if(this.props.location.state){
            this.setState(this.props.location.state);
        }
    }

    render(){
        return (
            <Panel className="login">
                <Image src="/yamp_logo.png"/>
                <LoginMessage/>
                <br/>
                { this.state.showMessageAfterRegistration && <RegistrationMessage/>}
                { this.state.showMessageAlreadyRegistered && <AlreadyRegisteredMessage/> }
                { this.state.showMessageWrongEmailOrPassword && <WrongEmailOrPassword/>}
                <Form>
                    <InputGroup>
                        <InputGroup.Addon>
                            <i className="fa fa-envelope-o" aria-hidden="true"></i>
                        </InputGroup.Addon>
                        <FormControl type="email" size="40" name="email" placeholder="Email address" value={this.state.email} onChange={this.handleInputChange}/>
                    </InputGroup>
                    <br/>
                    <InputGroup>
                        <InputGroup.Addon>
                            <i className="fa fa-key" aria-hidden="true"></i>
                        </InputGroup.Addon>
                        <FormControl type="password" size="40" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange}/>
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

function WrongEmailOrPassword(props){
    return <Alert bsStyle="danger">Wrong email or password</Alert>;
}

function LoginMessage(props) {
    return <h4>Log in to your account</h4>;
}

function RegistrationMessage(props) {
    return <Alert><h4>Your account has been created!</h4></Alert>;
}

function AlreadyRegisteredMessage(props) {
    return <Alert><h4>An account already exists with this email!</h4></Alert>;
}

export default Login;

