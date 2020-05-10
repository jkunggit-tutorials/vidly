import React from 'react';
import Joi from 'joi-browser';

import Form from './Form';

class RegisterForm extends Form {
  constructor() {
    super();
    this.state = {
      data: {
        email: '',
        password: '',
        name: '',
      },
      errors: {},
    };

    this.schema = {
      email: Joi.string().email().required().label('Email'),
      password: Joi.string().min(5).required().label('Password'),
      name: Joi.string().required().label('Name'),
    };
  }

  doSubmit = () => {
    console.log('submitted');
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('email', 'Email')}
          {this.renderInput('password', 'Passowrd', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
