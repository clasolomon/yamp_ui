import React, {Component} from 'react';
import { Panel, Image, Button } from 'react-bootstrap';
import { Form, FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMessageAfterRegistration: false,
            showMessageAlreadyRegistered: false,
            email: '',
            password: ''
        }
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleCancelClick = this.handleCancelClick.bind(this);
    }

    handleInputChange(event){
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    handleLoginClick(){

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
                    { !this.state.showMessageAlreadyRegistered && !this.state.showMessageAfterRegistration && <LoginMessage/>}
                    { this.state.showMessageAfterRegistration && <RegistrationMessage/>}
                    { this.state.showMessageAlreadyRegistered && <AlreadyRegisteredMessage/> }
                    <br/>
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

function LoginMessage(props) {
    return <h4>Log in to your account</h4>;
}

function RegistrationMessage(props) {
    return <h4>Your account has been created!<br/>Log in to your account.</h4>;
}

function AlreadyRegisteredMessage(props) {
    return <h4>An account already exists with this email!<br/>Log in to your account.</h4>;
}

export default Login;

