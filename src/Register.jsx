import React, {Component} from 'react';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            location: '',
            email: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event){
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event){
        event.preventDefault();
        instance.post('/user', this.state)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render(){
        return (
            <div className="Register">
                <h4>Register</h4>
                <form onSubmit={this.handleSubmit}>
                    <p>
                        First name
                        <br/>
                        <input type="text" size="40" name="first_name" value={this.state.first_name} onChange={this.handleInputChange}/>
                    </p>
                    <p>
                        Last name
                        <br/>
                        <input type="text" size="40" name="last_name" value={this.state.last_name} onChange={this.handleInputChange}/>
                    </p>
                    <p>
                        Location 
                        <br/>
                        <input type="text" size="40" name="location" value={this.state.location} onChange={this.handleInputChange}/>
                    </p>
                    <p>
                        E-mail address 
                        <br/>
                        <input type="email" size="40" name="email" value={this.state.email} onChange={this.handleInputChange}/>
                    </p>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}
