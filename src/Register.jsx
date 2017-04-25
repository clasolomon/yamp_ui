import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            email: '',
            password: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
    }

    handleInputChange(event){
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    handleRegisterClick(event){
        var instance = axios.create({
              baseURL: 'http://localhost:9000/',
              timeout: 2000
        });

        instance.post('/register', this.state)
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
            <div className="Register">
                <h4>Register</h4>
                <p>
                    User name
                    <br/>
                    <input type="text" size="40" name="user_name" value={this.state.user_name} onChange={this.handleInputChange}/>
                </p>
                <p>
                    E-mail address 
                    <br/>
                    <input type="email" size="40" name="email" value={this.state.email} onChange={this.handleInputChange}/>
                </p>
                <p>
                    Password
                    <br/>
                    <input type="text" size="40" name="password" value={this.state.password} onChange={this.handleInputChange}/>
                </p>
                <p><Button bsStyle="primary" onClick={this.handleRegisterClick}>Register</Button></p>
            </div>
        );
    }
}

export default Register;
