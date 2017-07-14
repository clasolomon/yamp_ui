import React from 'react';
import yup from 'yup';

function applyValidation(Component, schema){
    return class extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                errors: {}
            };
            this.validate = this.validate.bind(this);
            this.validateWithoutPreservingErrors = this.validateWithoutPreservingErrors.bind(this);
        }

        validate(input){
            let validationSchema = {};
            Object.keys(input).forEach((field) => validationSchema[field] = schema[field]);

            return yup.object().shape(validationSchema).validate(input, {abortEarly: false})
                .then((valid) => {
                    let newErrors = Object.assign({}, this.state.errors);
                    Object.keys(input).forEach((field) => delete newErrors[field]);
                    this.setState({errors: newErrors});
                })
                .catch((err) => {
                    console.log('err:', err);
                    let newErrors = Object.assign({}, this.state.errors);
                    err.inner.forEach((validationError) => {
                        newErrors[validationError.path] = validationError.message; 
                        delete input[validationError.path];
                    });
                    Object.keys(input).forEach((field) => delete newErrors[field]);
                    this.setState({errors: newErrors});
                });
        }

        validateWithoutPreservingErrors(input){
            let validationSchema = {};
            Object.keys(input).forEach((field) => validationSchema[field] = schema[field]);

            return yup.object().shape(validationSchema).validate(input, {abortEarly: false})
                .then((valid) => {
                    let newErrors = {};
                    this.setState({errors: newErrors});
                })
                .catch((err) => {
                    console.log('err:', err);
                    let newErrors = {};
                    err.inner.forEach((validationError) => {
                        newErrors[validationError.path] = validationError.message; 
                    });
                    this.setState({errors: newErrors});
                });
        }

        render(){
            return <Component
                {...this.props} 
                errors={this.state.errors}
                validate={this.validate}
                validateWithoutPreservingErrors={this.validateWithoutPreservingErrors}
            />;
        }
    };
}

module.exports = applyValidation;
