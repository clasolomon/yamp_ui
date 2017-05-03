import React, {Component} from 'react';
import { Button } from 'react-bootstrap';

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

    componentWillMount(){
        console.log('LOCATION:', this.props.location);
        console.log('LOCATION.state:', this.props.location.state);
        if(this.props.location.state){
            this.setState(this.props.location.state);
        }
    }

    render(){
        return (
            <div className="Login">
                <h4>Login</h4>
                { this.state.showMessageAfterRegistration && <RegistrationMessage/>}
                { this.state.showMessageAlreadyRegistered && <AlreadyRegisteredMessage/> }
                <p>
                    Email
                    <br/>
                    <input type="text" size="40" name="email" value={this.state.email} onChange={this.handleInputChange}/>
                </p>
                <p>
                    Password
                    <br/>
                    <input type="text" size="40" name="password" value={this.state.password} onChange={this.handleInputChange}/>
                </p>
                <p><Button bsStyle="primary" onClick={this.handleLoginClick}>Log in</Button></p>
            </div>
        );
    }
}

function RegistrationMessage(props) {
    return <p>Your account has been created. Please login! </p>;
}

function AlreadyRegisteredMessage(props) {
    return <p>An account already exists with this email. Please login! </p>;
}

export default Login;

