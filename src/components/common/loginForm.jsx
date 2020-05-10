import React, { Component } from 'react';
import Joi from 'joi-browser';

import Form from './Form';
import Input from './Input';

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
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name='username'
            value={data.name}
            label='user Name'
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name='password'
            value={data.password}
            label='Password'
            onChange={this.handleChange}
            error={errors.password}
          />
          <button disabled={this.validate()} className='btn btn-primary'>
            Login
          </button>
        </form>
      </div>
    );
  }
}
export default LoginForm;
