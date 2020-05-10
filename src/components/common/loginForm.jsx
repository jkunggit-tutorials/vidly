import React, { Component } from 'react';
import Joi from 'joi-browser';

import Form from './Form';

class LoginForm extends Form {
  constructor() {
    super();

    // only use ref when you absolutely need to like when you want to focus.
    this.username = React.createRef();

    this.state = {
      data: {
        username: '',
        password: '',
      },
      errors: {},
    };

    this.schema = {
      username: Joi.string().required().label('Username'),
      password: Joi.string().required().label('Password'),
    };
  }

  componentDidMount() {
    // this.username.current.focus();
  }

  doSubmit = () => {
    console.log('submitted');
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}
export default LoginForm;
