import React from 'react';
import yup from 'yup';

function applyValidation(ComponentWithoutValidation, schema){
    return class extends React.Component{
        constructor(props){
            super(props);
            this.state = {
                errors: {}
            };

            this.validate = this.validate.bind(this);
            this.getSchema = this.getSchema.bind(this);
        }

        getSchema(name){
            const schema = {
                valid_email: yup.string().email('Please provide valid email address!')
            }
            return schema[name];
        }

        validate(schemaName, event){
            let errorKey = event.target.name;
            let schema = this.getSchema(schemaName);

            return schema.validate(event.target.value)
                .then((valid)=>{
                    // remove the error if valid
                    let newErrors = this.state.errors;
                    delete newErrors[errorKey];
                    this.setState({errors: newErrors});
                })
                .catch((err)=>{
                    let newErrors = this.state.errors;
                    newErrors[errorKey] = err.errors[0];
                    this.setState({errors: newErrors});
                });
        }

        render(){
            return <ComponentWithoutValidation 
                {...this.props} 
                errors={this.state.errors}
                validate={this.validate}
            />;
        }
    };
}

module.exports = applyValidation;
