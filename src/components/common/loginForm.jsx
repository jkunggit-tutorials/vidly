import React, { Component } from 'react';

import Input from './Input';

class LoginForm extends Component {
  constructor() {
    super();

    // only use ref when you absolutely need to like when you want to focus.
    this.username = React.createRef();

    this.state = {
      account: {
        username: '',
        password: '',
      },
      errors: {},
    };
  }

  componentDidMount() {
    // this.username.current.focus();
  }

  validate = () => {
    const errors = {};
    const { account } = this.state;
    if (account.username.trim() === '') {
      errors.username = 'Username is required';
    }
    if (account.password.trim() === '') {
      errors.password = 'Password is required';
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    // we cannot have errors as null
    this.setState({ errors: errors || {} });
    if (errors) return;
    //const username = this.username.current.value;
    // console.log('submit', username);
  };

  validateProperty = ({ name, value }) => {
    if (name === 'username') {
      if (value.trim() === '') return 'username is required';
      // ...
    }
    if (name === 'password') {
      if (value.trim() === '') return 'password is required';
      // ...
    }
  };

  handleChange = ({ currentTarget: input }) => {
    // validate a specific field
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    console.log(errorMessage);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name='username'
            value={account.name}
            label='user Name'
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name='password'
            value={account.password}
            label='Password'
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className='btn btn-primary'>Login</button>
        </form>
      </div>
    );
  }
}
export default LoginForm;
